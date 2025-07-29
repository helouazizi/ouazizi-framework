import { GlobalEvents } from './events.js';

export class Renderer {
    constructor() {
        this.eventIdCounter = 0;
        this.oldVtree = null
        this._setupGlobalListeners();
    }

    _setupGlobalListeners() {
        const eventTypes = ['click', 'input', 'change', 'submit', 'keydown', 'dblclick', 'blur'];

        eventTypes.forEach(eventType => {
            const useCapture = eventType === 'blur'; // only `blur` needs capture
            document.addEventListener(eventType, (e) => {
                const target = e.target;
                const handlerId = target.getAttribute(`data-event-${eventType}`);
                if (handlerId) {
                    GlobalEvents.emit(handlerId, e);
                }
            }, useCapture);
        });
    }

    _createElement(vnode) {
        if (typeof vnode === 'string') return document.createTextNode(vnode);

        const el = document.createElement(vnode.tag);

        for (const [attr, value] of Object.entries(vnode.attrs || {})) {
            if (attr.startsWith('on') && typeof value === 'function') {
                const eventType = attr.slice(2).toLowerCase();
                const handlerId = `evt-${eventType}-${this.eventIdCounter++}`;
                GlobalEvents.on(handlerId, value);
                el.setAttribute(`data-event-${eventType}`, handlerId);
            } else {
                el.setAttribute(attr, value);
            }
        }

        if (vnode.children) {
            vnode.children.forEach(child => {
                el.appendChild(this._createElement(child));
            });
        }

        if (vnode.text) {
            el.appendChild(document.createTextNode(vnode.text));
        }
        vnode.el = el; // save reference
        return el;
    }

    render(target, vtree) {
        const root = typeof target === 'string' ? document.querySelector(target) : target;
        if (!root) return;

        if (!this.oldVtree) {
            // Initial render: create and append real DOM
            root.innerHTML = '';
            this.rootElement = this._createElement(vtree);
            root.appendChild(this.rootElement);
            this.oldVtree = vtree;
        } else {
            this._patch(root, vtree, this.oldVtree);
            this.oldVtree = vtree;
        }
    }
    _patch(parent, newNode, oldNode) {
        const existingDomNode = oldNode?.el; // use stored DOM reference

        if (!oldNode) {
            if (newNode) {
                const newEl = this._createElement(newNode);
                parent.appendChild(newEl);
                newNode.el = newEl;
            }
        } else if (!newNode) {
            if (existingDomNode && existingDomNode.parentNode === parent) {
                parent.removeChild(existingDomNode);
            }
        } else if (this._changed(newNode, oldNode)) {
            const newEl = this._createElement(newNode);
            this._cleanupEventAttributes(oldNode); // Clean up old event handlers
            if (existingDomNode && existingDomNode.parentNode === parent) {
                parent.replaceChild(newEl, existingDomNode);
            } else {
                parent.appendChild(newEl);
            }
            newNode.el = newEl;
        } else if (typeof newNode !== 'string' && newNode.tag) {
            newNode.el = existingDomNode;
            this._updateAttributes(existingDomNode, newNode.attrs || {}, oldNode.attrs || {});
            const newLen = newNode.children?.length || 0;
            const oldLen = oldNode.children?.length || 0;

            for (let i = 0; i < newLen || i < oldLen; i++) {
                this._patch(existingDomNode, newNode.children?.[i], oldNode.children?.[i]);
            }
        } else if (typeof newNode === 'string' && typeof oldNode === 'string') {
            if (existingDomNode && newNode !== oldNode) {
                existingDomNode.textContent = newNode;
            }
        }
    }

    _updateAttributes(domElement, newAttrs, oldAttrs) {
        // Remove old attrs not present in newAttrs
        for (const key of Object.keys(oldAttrs)) {
            if (!(key in newAttrs)) {
                domElement.removeAttribute(key);
            }
        }

        // Set/update new attrs
        for (const [key, value] of Object.entries(newAttrs)) {
            if (key.startsWith('on')) {
                // Event handlers are handled globally, so ignore here
                continue;
            }
            const oldValue = oldAttrs[key];
            if (String(oldValue) !== String(value)) {
                domElement.setAttribute(key, value);
            }
        }
    }

    _changed(node1, node2) {
        if (typeof node1 !== typeof node2) return true;

        if (typeof node1 === 'string' && node1 !== node2) return true;

        if (node1.tag !== node2.tag) return true;

        if ((node1.attrs && node1.attrs.key) !== (node2.attrs && node2.attrs.key)) return true;

        const filterAttrs = (attrs) =>
            Object.fromEntries(Object.entries(attrs || {}).filter(([k]) => !k.startsWith('on')));

        const attrs1 = filterAttrs(node1.attrs);
        const attrs2 = filterAttrs(node2.attrs);

        const keys1 = Object.keys(attrs1);
        const keys2 = Object.keys(attrs2);
        if (keys1.length !== keys2.length) return true;

        for (const key of keys1) {
            if (String(attrs1[key]) !== String(attrs2[key])) return true;
        }

        if ((node1.text || '') !== (node2.text || '')) return true;

        return false;
    }

    _cleanupEventAttributes(vnode) {
        if (!vnode?.attrs) return;

        for (const [attr, value] of Object.entries(vnode.attrs)) {
            if (attr.startsWith('on') && typeof value === 'function') {
                const eventType = attr.slice(2).toLowerCase();
                const handlerId = vnode.el?.getAttribute(`data-event-${eventType}`);
                if (handlerId) {
                    GlobalEvents.off(handlerId, value);
                }
            }
        }
    }


}
