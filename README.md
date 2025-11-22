# FlashUI

Welcome to **FlashUI**, a lightweight JavaScript framework for building interactive web applications. FlashUI abstracts the DOM, manages application state, handles events, and provides a simple routing system—all without relying on other frameworks like React, Vue, or Angular.

---

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Installation](#installation)
- [Creating Elements](#creating-elements)
- [Nesting Elements](#nesting-elements)
- [Event Handling](#event-handling)
- [State Management](#state-management)
- [Routing System](#routing-system)
- [Why FlashUI Works the Way It Does](#why-flashui-works-the-way-it-does)
- [Complet Example](#complet-example)


---

## Introduction

FlashUI is designed to simplify front-end development by providing:

- **Virtual DOM** – Efficiently updates only the parts of the DOM that change.  
- **State Management** – Centralized state accessible across components.  
- **Routing System** – Synchronizes the URL with the application state.  
- **Event Handling** – Custom API for user interactions.  

FlashUI is perfect for building single-page applications (SPA) and dynamic web interfaces without relying on third-party frameworks.

---

## Key Features

1. **Abstracted DOM** – Work with JavaScript objects instead of direct DOM manipulation.  
2. **Virtual DOM Updates** – Minimize unnecessary DOM re-renders.  
3. **State Management** – Centralized store accessible throughout the app. 
4. **Custom Event API** – Attach events through FlashUI’s API.  
5. **Routing System** – Easily manage page navigation.  


---

## Installation

Include FlashUI in your project:


## Creating Elements
Elements are plain JavaScript objects:

```javascript
// Simple div
const myDiv = {
  tag: 'div',
  attrs: { class: 'container' },
  children: [
     {
      tag: "h1",
      text: "Hello World"
     }
  ]
};

// Button with click handler
const myButton = {
  tag: 'button',
  text: 'Click Me',
  attrs: { 
    onclick: () => console.log('Clicked!') 
  },
};
```


# Nesting Elements
## Use the children array to create hierarchies:
```javascript
const card = {
  tag: 'div',
  attrs: { class: 'card' },
  children: [
    {
      tag: 'h2',
      text: 'Card Title'
    },
    {
      tag: 'p',
      children: ['Card content goes here...']
    },
  ]
};

```

# State Management
## Initialize State
```javascript
const state = new State({
  count: 0,
  todos: [],
  
});
```
## Update State 
```javascript
// Single property
state.set('count', 5);

// Multiple properties
state.set('todos', [newTodo, ...state.get('todos')]);
```



# Event Handling
## Prefix event names with on and use camelCase:
```javascript
const counterButton = {
  tag: 'button',
  text: 'Increment',
  attrs: {
    onclick: () => state.set('count', state.get('count') + 1)
  },
};
```


# Routing System
## Define Routes
```javascript
const router = new Router({
  '/': () => showHomePage(),
  '/about': () => showAboutPage(),
  '/contact': () => showContactPage()
});
```

# Why FlashUI Works the Way It Does
## Virtual DOM Benefits
Performance: Batches DOM operations

Efficiency: Only updates changed nodes

Declarative: UI = f(state)

## Event Delegation
Single event listener per event type

Works with dynamically created elements

Automatic handler cleanup




# Keyed Updates
- **Preserves element state during re-renders**

- **Minimizes DOM operations**

- **Required for dynamic lists**

# Complet Example
```javascript
// State initialization
const state = new State({
  count: 0
});

// Button component
function CounterButton() {
  return {
    tag: 'button',
    text: 'Increment',
    attrs: {
      onclick: () => state.set('count', state.get('count') + 1)
    },
  };
}

// Main app
function App() {
  return {
    tag: 'div',
    children: [
      {
        tag: 'h1',
        text: `Count: ${state.get('count')}`
        attrs: {
          onclick: CounterButton
        }
      }
    ]
  };
}

// Setup
const renderer = new Renderer();
renderer.render(document.body, App());
```
