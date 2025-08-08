// Counter.js
import { useState } from "../../src/index.js"


export function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Guest')

  return {
    tag: 'div',
    children: [
      { tag: 'h1', text: `Hello, ${name}` },
      { tag: 'p', text: `Count: ${count}` },
      {
        tag: 'button',
        text: 'Increment',
        attrs: {
          onClick: () => setCount(count + 1)
        }
      },
      {
        tag: 'input',
        attrs: {
          placeholder: 'Enter name',
          value: name,
          onchange: (e) => setName(e.target.value)
        }
      }
    ]
  }
}

