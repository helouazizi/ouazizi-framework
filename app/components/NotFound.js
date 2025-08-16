// app/components/NotFound.js
// app/components/NotFound.js

export function NotFound() {
    return {
        tag: 'section',
        attrs: { class: "notfound" },
        children: [
            { tag: 'h1', text: "404 - Page Not Found", attrs: { class: "notfound-title" } },
            { tag: 'p', text: "Oops! The page you're looking for doesn’t exist.", attrs: { class: "notfound-subtitle" } },
            {
                tag: 'a',
                text: "⬅ Back to Home",
                attrs: { class: "notfound-link", href: "/" }
            }
        ]
    }
}
