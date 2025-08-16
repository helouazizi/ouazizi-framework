// src/core/state.js
export class State {
    constructor(intialSate = {}) {
        this.state = { ...intialSate }
        this.listeners = new Map()
        this.callack = null
    }

    set(key, value) {
        this.state[key] = value;
        this.subscribe(key, this.callack)
        if (this.listeners.has(key)) {
            for (const cb of this.listeners.get(key)) {
                cb(value)
            };
        }
        this.unsubscribe(key, this.callack)
    }

    setContext(key, value) {
        this.state[key] = value
    }

    setStet(callack) {
        this.callack = callack;
    }
    get(key) {
        return this.state[key]
    }
    getState() {
        return { ...this.state };
    }

    subscribe(key, callback) {

        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
    }

    unsubscribe(key, callback) {
        if (this.listeners.has(key)) {
            const index = this.listeners.get(key).indexOf(callback);
            if (index !== -1) {
                this.listeners.get(key).splice(index, 1);
            }
        }
    }
}