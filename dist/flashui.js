var FlashUI = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    Renderer: () => Renderer,
    Router: () => Router,
    State: () => State
  });

  // src/core/state.js
  var State = class {
    constructor(intialSate = {}) {
      this.state = { ...intialSate };
      this.listeners = /* @__PURE__ */ new Map();
      this.callack = null;
    }
    set(key, value) {
      this.state[key] = value;
      this.subscribe(key, this.callack);
      if (this.listeners.has(key)) {
        for (const cb of this.listeners.get(key)) {
          cb(value);
        }
        ;
      }
      this.unsubscribe(key, this.callack);
    }
    setContext(key, value) {
      this.state[key] = value;
    }
    setStet(callack) {
      this.callack = callack;
    }
    get(key) {
      return this.state[key];
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
  };

  // src/core/dom.js
  var Renderer = class {
    constructor() {
      this.oldVtree = null;
    }
    _createElement(obj) {
      if (!obj.tag) return document.createTextNode("");
      const el = document.createElement(obj.tag);
      el._listeners = {};
      for (const [key, value] of Object.entries(obj.attrs || {})) {
        if (key.startsWith("on") && typeof value === "function") {
          const event = key.slice(2).toLowerCase();
          if (obj.player) {
            addEventListener(event, value);
          } else {
            el.addEventListener(event, value);
            el._listeners[event] = value;
          }
        } else {
          el.setAttribute(key, value);
        }
      }
      if (obj.children) {
        obj.children.forEach((child) => {
          el.appendChild(this._createElement(child));
        });
      }
      if (obj.text) {
        el.appendChild(document.createTextNode(obj.text));
      }
      obj.el = el;
      return el;
    }
    render(target, vtree) {
      const root = typeof target === "string" ? document.querySelector(target) : target;
      if (!root) return;
      if (!this.oldVtree) {
        root.innerHTML = "";
        this.rootElement = this._createElement(vtree);
        root.appendChild(this.rootElement);
        this.oldVtree = vtree;
      } else {
        this._patch(root, vtree, this.oldVtree);
        this.oldVtree = vtree;
      }
    }
    _patch(parent, newNode, oldNode) {
      if (!oldNode) {
        if (newNode) {
          const newEl = this._createElement(newNode);
          parent.appendChild(newEl);
          newNode.el = newEl;
        }
        return;
      }
      if (!newNode) {
        if (oldNode.el && oldNode.el.parentNode === parent) {
          parent.removeChild(oldNode.el);
        }
        return;
      }
      if (typeof newNode === "string" || typeof oldNode === "string") {
        if (newNode !== oldNode) {
          const newEl = this._createElement(newNode);
          if (oldNode.el && oldNode.el.parentNode === parent) {
            parent.replaceChild(newEl, oldNode.el);
          } else {
            parent.appendChild(newEl);
          }
          if (typeof newNode !== "string") newNode.el = newEl;
        } else {
          newNode.el = oldNode.el;
        }
        return;
      }
      if (newNode.tag !== oldNode.tag || newNode.attrs?.key !== oldNode.attrs?.key) {
        const newEl = this._createElement(newNode);
        if (oldNode.el && oldNode.el.parentNode === parent) {
          parent.replaceChild(newEl, oldNode.el);
        } else {
          parent.appendChild(newEl);
        }
        newNode.el = newEl;
        return;
      }
      const el = newNode.el = oldNode.el;
      this._updateAttributes(el, newNode.attrs || {}, oldNode.attrs || {});
      const newChildren = newNode.children || [];
      const oldChildren = oldNode.children || [];
      const oldKeyed = /* @__PURE__ */ new Map();
      const oldUnkeyed = [];
      oldChildren.forEach((child, index) => {
        const key = child?.attrs?.key;
        if (key != null) {
          oldKeyed.set(key, child);
        } else {
          oldUnkeyed.push({ child, index });
        }
      });
      const usedOldIndices = /* @__PURE__ */ new Set();
      const newIndexToOldIndexMap = new Array(newChildren.length);
      const newChildrenWithOldIndex = [];
      newChildren.forEach((newChild, i) => {
        const key = newChild?.attrs?.key;
        if (key != null && oldKeyed.has(key)) {
          const oldChild = oldKeyed.get(key);
          const oldIndex = oldChildren.indexOf(oldChild);
          newIndexToOldIndexMap[i] = oldIndex;
          oldKeyed.delete(key);
          newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex });
          usedOldIndices.add(oldIndex);
        } else if (oldUnkeyed.length > 0) {
          const entry = oldUnkeyed.shift();
          newIndexToOldIndexMap[i] = entry.index;
          newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex: entry.index });
          usedOldIndices.add(entry.index);
        } else {
          newIndexToOldIndexMap[i] = -1;
          newChildrenWithOldIndex.push({ newChild, newIndex: i, oldIndex: -1 });
        }
      });
      newChildrenWithOldIndex.forEach(({ newChild, oldIndex }) => {
        const oldChild = oldIndex !== -1 ? oldChildren[oldIndex] : null;
        this._patch(el, newChild, oldChild);
      });
      for (let i = 0; i < newChildren.length; i++) {
        if (newIndexToOldIndexMap[i] === -1) {
          const newChild = newChildren[i];
          const domChild = newChild.el;
          const refNode = el.childNodes[i] || null;
          el.insertBefore(domChild, refNode);
        }
      }
      oldKeyed.forEach((oldChild) => this._patch(el, null, oldChild));
      oldUnkeyed.forEach(({ child, index }) => {
        if (!usedOldIndices.has(index)) {
          this._patch(el, null, child);
        }
      });
      if (newNode.text !== oldNode.text) {
        el.textContent = newNode.text || "";
      }
    }
    _updateAttributes(el, newAttrs, oldAttrs) {
      if (!el) return;
      el._listeners = el._listeners || {};
      for (const key of Object.keys(oldAttrs)) {
        if (!(key in newAttrs)) {
          if (key.startsWith("on") && typeof oldAttrs[key] === "function") {
            const event = key.slice(2).toLowerCase();
            if (el._listeners[event]) {
              el.removeEventListener(event, el._listeners[event]);
              delete el._listeners[event];
            }
          } else {
            el.removeAttribute(key);
          }
        }
      }
      for (const [key, value] of Object.entries(newAttrs)) {
        if (key.startsWith("on") && typeof value === "function") {
          const event = key.slice(2).toLowerCase();
          const oldListener = el._listeners[event];
          if (oldListener !== value) {
            if (oldListener) {
              el.removeEventListener(event, oldListener);
            }
            el.addEventListener(event, value);
            el._listeners[event] = value;
          }
        } else if (key === "checked" || key === "disabled" || key === "selected") {
          el[key] = !!value;
        } else {
          el.setAttribute(key, value);
        }
      }
    }
  };

  // src/core/router.js
  var Router = class {
    constructor(routes = {}) {
      this.routes = routes;
      window.addEventListener("DOMContentLoaded", () => this.load(location.hash));
      window.addEventListener("hashchange", () => this.load(location.hash));
    }
    getPath(hash) {
      return hash.replace(/^#/, "") || "/";
    }
    load(hash) {
      const path = this.getPath(hash);
      const view = this.routes[path];
      if (view && typeof view === "function") {
        view();
      } else {
        console.error(`Route "${path}" not found`);
      }
    }
  };
  return __toCommonJS(src_exports);
})();
