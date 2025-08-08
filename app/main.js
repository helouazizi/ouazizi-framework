// main.js

import { Routing } from "../src/index.js"
import { Counter } from "./components/Home.js"
import { About } from "./components/About.js"

const routes = {
  
  "/": Counter,
  "/about": About,
}

const root = document.getElementById("root")

Routing(root, routes)
