export function Header(stateInstance) {


  return {
    tag: 'header',
    attrs: { class: 'header' },
    children: [
      {
        tag: 'h1',
        attrs: { class: 'header-title' },
        text: 'Mini'
      },
      {
        tag: 'nav',
        attrs: { class: 'header-nav' },
        children: [
          {
            tag: 'a',
            attrs: { href: '#/', class: 'nav-link' },
            text: 'Home'
          },
          {
            tag: 'a',
            attrs: { href: '#/about', class: 'nav-link' },
            text: 'About'
          },
          {
            tag: 'a',
            attrs: { href: '#/contact', class: 'nav-link' },
            text: 'Contact'
          }
        ]
      }
    ]
  };
}
