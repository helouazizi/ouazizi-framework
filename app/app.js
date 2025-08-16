// app/app.js
import { Home } from "./components/Home.js"
import { NotFound } from "./components/NotFound.js"
import { state } from "./main.js"

function App() {
    const route = state.get('route') || "/"
    let currentComponent
    switch (route) {
        case "/":
            currentComponent = Home()
            break
        default:
            currentComponent = NotFound()
    }
    return currentComponent
}

export default App
