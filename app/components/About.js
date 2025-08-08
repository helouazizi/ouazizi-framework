// About.js
export function About() {
  return {
    tag: "div",
    children: [
      { tag: "h1", text: "About Page" },
      {
        tag: "a",
        attrs: { href: "#/" },
        children: [{ tag: "button", text: "Go Home" }]
      }
    ]
  }
}
