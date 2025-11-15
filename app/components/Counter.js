import { state } from "../main.js"

export function Counter() {

  let count = state.get('counter') || 0

  return {
    tag: 'div',
    attrs: { class: "counter" },
    children: [
      {
        tag: 'p',
        attrs: { class: "counter-value" },
        text: `Count: ${count}`
      },
      {
        tag: 'div',
        attrs: { class: "counter-btns" },
        children: [
          {
            tag: 'button',
            text: 'Increment',
            attrs: {
              class: "counter-btn increment",
              onClick: () => state.set('counter', count + 1)
            }
          },
          {
            tag: 'button',
            text: 'Reset',
            attrs: {
              class: "counter-btn reset",
              onClick: () => state.set('counter', 0)
            }
          }
        ]
      }
    ]
  }
}
