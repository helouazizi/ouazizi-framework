let currentComponent = null
let stateIndex = 0

export function setContext(component, index = 0) {
    currentComponent = component
    stateIndex = index
}

export function getContext() {
    return {
        currentComponent,
        stateIndex
    }
}

export function incrementStateIndex() {
    return stateIndex++
}
