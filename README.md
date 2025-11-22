[![npm](https://img.shields.io/npm/v/@helouazizi/flashui?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/@helouazizi/flashui)
[![Downloads](https://img.shields.io/npm/dm/@helouazizi/flashui?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@helouazizi/flashui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/helouazizi/FlashUI?style=for-the-badge&logo=github)](https://github.com/helouazizi/FlashUI/stargazers)

<div align="center">
  <br/>
  <h1>FlashUI — Lightning-Fast Virtual DOM Framework</h1>
  <strong>A minimalist, from-scratch JavaScript framework for building blazing-fast web apps.</strong>
  <br/><br/>
  <a href="#installation"><strong>Get Started in 10 Seconds →</strong></a>
</div>

<br/>

## Features

- **Virtual DOM** — Only update what changes
- **Global State Store** — Simple, reactive, no Redux needed
- **Hash-based Router** — SPA routing with zero config
- **Custom Event System** — `onClick`, `onInput`, etc. (no addEventListener)
- **Zero dependencies** — Pure vanilla JS
- **Less than 9 KB** — Smaller than most UI libraries
- **Full project template** — Ready-to-code structure

---
# installation


```bash
npx @helouazizi/flashui my-app
cd my-app
npm install
npm run dev
```

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


## 🤝 Contributing  
We LOVE contributions! Whether it's a bug fix, a new feature, documentation improvement, or even a tiny typo — you're absolutely welcome!  


## 📄 License

FlashUI is MIT licensed — use it anywhere, for anything, forever.  
Made with ❤️ (and a lot of coffee) by [helouazizi](https://github.com/helouazizi).  
⭐ Star this repo if you love FlashUI — it means the world!