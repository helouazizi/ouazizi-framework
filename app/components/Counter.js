// app/components/Counter.js
// app/components/Counter.js
import { state } from "../main.js"

export function Counter() {
    let count = state.get('counter') || 0
  
    

    return {
        tag: 'div',
        attrs: { class: "counter" },
        children: [

            { tag: 'p', text: `Count: ${count}`, attrs: { class: "counter-value" } },
            {
                tag: 'button',
                text: 'Increment',
                attrs: {
                    class: "counter-btn",
                    onClick: () => state.set('counter', count + 1)
                }
            }
        ]
    }
}
