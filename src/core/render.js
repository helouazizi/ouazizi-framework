import { setContext, getContext } from "./context.js"

export function Render(container, componentFn) {
    const { currentComponent: prevComponent } = getContext()

    const component = {
        container,
        component: componentFn,
        states:
            prevComponent && prevComponent.component === componentFn
                ? prevComponent.states
                : [],
        vdom: prevComponent && prevComponent.component === componentFn
            ? prevComponent.vdom
            : null
    }

    setContext(component)

    const newVDOM = componentFn()

    if (component.vdom) {
        // Use diffing
        diff(container, newVDOM, component.vdom)
    } else {
        // First render
        const dom = Jsx(newVDOM)
        container.innerHTML = ''
        container.appendChild(dom)
    }

    // Save new vdom for future diffs
    component.vdom = newVDOM
}

// The diff function implements the patching algorithm
function diff(parent, newNode, oldNode) {
    if (!oldNode) {
        if (newNode) {
            const newEl = Jsx(newNode)
            parent.appendChild(newEl)
            newNode.el = newEl
        }
        return
    }

    if (!newNode) {
        if (oldNode.el && oldNode.el.parentNode === parent) {
            parent.removeChild(oldNode.el)
        }
        return
    }

    if (typeof newNode === 'string' || typeof oldNode === 'string') {
        if (newNode !== oldNode) {
            const newEl = Jsx(newNode)
            if (oldNode.el && oldNode.el.parentNode === parent) {
                parent.replaceChild(newEl, oldNode.el)
            } else {
                parent.appendChild(newEl)
            }
            if (typeof newNode !== 'string') newNode.el = newEl
        } else {
            newNode.el = oldNode.el
        }
        return
    }

    // Replace if tag or key changed
    if (newNode.tag !== oldNode.tag || newNode.attrs?.key !== oldNode.attrs?.key) {
        const newEl = Jsx(newNode)
        if (oldNode.el && oldNode.el.parentNode === parent) {
            parent.replaceChild(newEl, oldNode.el)
        } else {
            parent.appendChild(newEl)
        }
        newNode.el = newEl
        return
    }

    // In-place update
    const el = (newNode.el = oldNode.el)

    updateAttributes(el, newNode.attrs || {}, oldNode.attrs || {})

    // Children patching with keyed diffing
    const newChildren = newNode.children || []
    const oldChildren = oldNode.children || []

    const oldKeyed = new Map()
    const oldUnkeyed = []

    oldChildren.forEach((child, index) => {
        const key = child?.attrs?.key
        if (key != null) {
            oldKeyed.set(key, child)
        } else {
            oldUnkeyed.push({ child, index })
        }
    })

    const usedOldIndices = new Set()
    const newIndexToOldIndexMap = new Array(newChildren.length)
    const newChildrenWithOldIndex = []

    newChildren.forEach((newChild, i) => {
        const key = newChild?.attrs?.key
        if (key != null && oldKeyed.has(key)) {
            const oldChild = oldKeyed.get(key)
            const oldIndex = oldChildren.indexOf(oldChild)
            newIndexToOldIndexMap[i] = oldIndex
            oldKeyed.delete(key)
            newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex })
            usedOldIndices.add(oldIndex)
        } else if (oldUnkeyed.length > 0) {
            const entry = oldUnkeyed.shift()
            newIndexToOldIndexMap[i] = entry.index
            newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex: entry.index })
            usedOldIndices.add(entry.index)
        } else {
            newIndexToOldIndexMap[i] = -1
            newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex: -1 })
        }
    })

    // Patch all children recursively
    newChildrenWithOldIndex.forEach(({ newChild, oldIndex }) => {
        const oldChild = oldIndex !== -1 ? oldChildren[oldIndex] : null
        diff(el, newChild, oldChild)
    })

    // Insert new nodes only (skip moving existing nodes)
    for (let i = 0; i < newChildren.length; i++) {
        if (newIndexToOldIndexMap[i] === -1) {
            const newChild = newChildren[i]
            const domChild = newChild.el
            const refNode = el.childNodes[i] || null
            el.insertBefore(domChild, refNode)
        }
    }

    // Remove leftover old keyed nodes not matched
    oldKeyed.forEach(oldChild => diff(el, null, oldChild))

    // Remove leftover old unkeyed nodes not matched
    oldUnkeyed.forEach(({ child, index }) => {
        if (!usedOldIndices.has(index)) {
            diff(el, null, child)
        }
    })

    if (newNode.text !== oldNode.text) {
        el.textContent = newNode.text || ''
    }
}

function updateAttributes(el, newAttrs, oldAttrs) {
    // Remove old attributes and listeners
    for (const key of Object.keys(oldAttrs)) {
        if (!(key in newAttrs)) {
            if (key.startsWith("on") && typeof oldAttrs[key] === 'function') {
                const event = key.slice(2).toLowerCase()
                if (el._listeners && el._listeners[event]) {
                    el.removeEventListener(event, el._listeners[event])
                    delete el._listeners[event]
                }
            } else {
                el.removeAttribute(key)
            }
        }
    }

    // Add/update attributes and listeners
    el._listeners = el._listeners || {}

    for (const [key, value] of Object.entries(newAttrs)) {
        if (key.startsWith("on") && typeof value == 'function') {
            const event = key.slice(2).toLowerCase()
            const oldListener = el._listeners[event]

            if (oldListener !== value) {
                if (oldListener) {
                    el.removeEventListener(event, oldListener)
                }
                el.addEventListener(event, value)
                el._listeners[event] = value
            }
        }
        else if (key === 'checked' || key === 'disabled' || key === 'selected') {
            el[key] = !!value
        } else {
            el.setAttribute(key, value)
        }
    }
}


const Jsx = (obj) => {
    if (!obj.tag) return document.createTextNode('')

    const el = document.createElement(obj.tag)

    el._listeners = {}  // Initialize listener map

    for (const [key, value] of Object.entries(obj.attrs || {})) {
        if (key.startsWith("on") && typeof value === 'function') {
            const event = key.slice(2).toLowerCase()
            el.addEventListener(event, value)
            el._listeners[event] = value  // Track listener for later
        } else {
            el.setAttribute(key, value)
        }
    }

    if (obj.children) {
        obj.children.forEach(child => {
            el.appendChild(Jsx(child))
        })
    }

    if (obj.text) {
        el.appendChild(document.createTextNode(obj.text))
    }

    obj.el = el

    return el
}
