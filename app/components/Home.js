// app/components/Home.js
import { Counter } from "./Counter.js"
import { Header } from "./Header.js"
import { Footer } from "./Footer.js"

export function Home() {
  return {
    tag: 'section',
    attrs: { class: "home" },
    children: [
      Header(),
      {
        tag: 'div',
        attrs: { class: "demo-card" },
        children: [
          { tag: 'h2', text: "Demo: useState", attrs: { class: "demo-title" } },
          Counter()
        ]
      },
      Footer()
    ]
  }
}
