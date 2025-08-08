// router.js

import { Render } from "./render.js"

export function Routing(container, routes) {
  function getCurrentPath() {
    return location.hash.slice(1) || "/"
  }

  function handleRouteChange() {
    const path = getCurrentPath()
    const Component = routes[path]
    if (Component) {
      Render(container, Component)
    } else {
      // If no fallback route defined
      container.innerHTML = `<h1>404 Not Found</h1>`
    }
  }

  // Listen to hash changes
  window.addEventListener("hashchange", handleRouteChange)
  window.addEventListener("DOMContentLoaded", handleRouteChange)

  // Initial route render
  handleRouteChange()
}
