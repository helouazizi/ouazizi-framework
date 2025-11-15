export function Footer() {
  return {
    tag: 'footer',
    attrs: { class: 'footer' },
    children: [
      {
        tag: 'div',
        attrs: { class: 'footer-top' },
        children: [
          {
            tag: 'div',
            attrs: { class: 'footer-brand' },
            children: [
              { tag: 'h2', text: 'FlashUI' },
              { tag: 'p', text: 'Lightweight • Modular • Custom Built' }
            ]
          },
          {
            tag: 'div',
            attrs: { class: 'footer-social' },
            children: [
              { tag: 'a', attrs: { href: 'mailto:ouazizi2code@gmail.com' }, 
                children: [ { tag: 'i', attrs: { class: 'fa-solid fa-envelope' } } ] },

              { tag: 'a', attrs: { href: 'linkedin.com/in/helouazizi', target: "_blank" }, 
                children: [ { tag: 'i', attrs: { class: 'fa-brands fa-linkedin' } } ] },

              { tag: 'a', attrs: { href: 'https://x.com/h_elouazizi', target: "_blank" }, 
                children: [ { tag: 'i', attrs: { class: 'fa-brands fa-x-twitter' } } ] },

              { tag: 'a', attrs: { href: 'https://portfolio-murex-eta-o6qvsn3c11.vercel.app/', target: "_blank" }, 
                children: [ { tag: 'i', attrs: { class: 'fa-solid fa-globe' } } ] }
            ]
          }
        ]
      },

      /* ------- BOTTOM COPYRIGHT ------- */
      {
        tag: 'div',
        attrs: { class: 'footer-bottom' },
        text: '© 2025 FlashUI. All rights reserved.'
      }
    ]
  }
}
