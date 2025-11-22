export function Header() {
  return {
    tag: 'header',
    attrs: { class: 'header' },
    children: [
      {
        tag: 'div',
        attrs: { class: 'header-left' },
        children: [
          {
            tag: 'div',
            attrs: { class: 'logo' },
            children: [
              { tag: 'span', text: '⚡' },
              { tag: 'h1', text: 'FlashUI' }
            ]
          }
        ]
      },
      {
        tag: 'nav',
        attrs: { class: 'header-nav' },
        children: [
          { tag: 'a', attrs: { href: '/' }, text: 'Home' },
          { tag: 'a', attrs: { href: 'https://helouazizi.github.io/FlashUI/#readme' }, text: 'Docs', target: '_blank' },
          {
            tag: 'a',
            attrs: { href: 'https://github.com/helouazizi/mini-framework', class: 'github-icon', target: '_blank' },
            children: [
              { tag: 'i', attrs: { class: 'fa-brands fa-github' } }
            ]
          }
        ]
      }
    ]
  }
}
