// Home.js (Refactored Professional Version)
import { Counter } from "./Counter.js"
import { Header } from "./Header.js"
import { Footer } from "./Footer.js"

export function Home() {
  return {
    tag: 'section',
    attrs: { class: 'home' },
    children: [
      Header(),
      {
        tag: 'section',
        attrs: { class: 'hero' },
        children: [
          {
            tag: 'h1',
            attrs: { class: 'hero-title' },
            text: 'Build Fast. Build Simple. Build Custom.'
          },
          {
            tag: 'p',
            attrs: { class: 'hero-sub' },
            text: 'A lightweight JavaScript framework with component rendering, state management, and a clean architecture designed for learning and scaling.'
          }
        ]
      },


      // FEATURES SECTION
      {
        tag: 'section',
        attrs: { class: 'features' },
        children: [
          { tag: 'h2', text: 'Core Features', attrs: { class: 'features-title' } },

          {
            tag: 'div',
            attrs: { class: 'features-grid' },
            children: [

              /* --- STATE MANAGEMENT --- */
              {
                tag: 'div',
                attrs: { class: 'feature-card' },
                children: [
                  {
                    tag: 'h3',
                    children: [
                      { tag: 'i', attrs: { class: 'fa-solid fa-bolt' } },
                      { tag: 'span', text: ' State Management' }
                    ]
                  },
                  {
                    tag: 'p',
                    text: 'A simple and predictable global state system inspired by React Hooks — without complexity.'
                  }
                ]
              },

              /* --- ROUTING --- */
              {
                tag: 'div',
                attrs: { class: 'feature-card' },
                children: [
                  {
                    tag: 'h3',
                    children: [
                      { tag: 'i', attrs: { class: 'fa-solid fa-route' } },
                      { tag: 'span', text: ' Routing' }
                    ]
                  },
                  {
                    tag: 'p',
                    text: 'Lightweight routing for pages and components, perfect for small and medium applications.'
                  }
                ]
              },

              /* --- EVENTS --- */
              {
                tag: 'div',
                attrs: { class: 'feature-card' },
                children: [
                  {
                    tag: 'h3',
                    children: [
                      { tag: 'i', attrs: { class: 'fa-solid fa-wand-magic-sparkles' } },
                      { tag: 'span', text: ' Events' }
                    ]
                  },
                  {
                    tag: 'p',
                    text: 'Clean event binding that keeps components modular, predictable, and easy to debug.'
                  }
                ]
              },

              /* --- DOM RENDERING ENGINE --- */
              {
                tag: 'div',
                attrs: { class: 'feature-card' },
                children: [
                  {
                    tag: 'h3',
                    children: [
                      { tag: 'i', attrs: { class: 'fa-solid fa-gem' } },
                      { tag: 'span', text: ' DOM Rendering Engine' }
                    ]
                  },
                  {
                    tag: 'p',
                    text: 'Optimized rendering with minimal DOM updates — fast and efficient without a virtual DOM.'
                  }
                ]
              }

            ]
          }
        ]
      }

      ,

      // DEMO COMPONENT SECTION
      {
        tag: 'section',
        attrs: { class: 'demo-card' },
        children: [
          { tag: 'h2', text: 'Demo: useState Counter', attrs: { class: 'demo-title' } },
          Counter()
        ]
      },

      Footer()
    ]
  }
}