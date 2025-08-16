// app/components/Header.js

export function Header() {
  return {
    tag: 'header',
    attrs: { class: "header" },
    children: [
      { tag: 'h1', text: "⚡ Welcome to My JS Framework ⚡", attrs: { class: "header-title" } },
      {
        tag: 'p',
        text: "A lightweight custom framework with state management (like React’s hooks).",
        attrs: { class: "header-subtitle" }
      }
    ]
  }
}
