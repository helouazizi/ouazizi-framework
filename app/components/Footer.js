export function Footer(state) {

  return {
    tag: 'footer',
    attrs: { class: 'footer' },
    children: [
      {
        tag: 'p',
        attrs: { class: 'footer-text' },
        text: '© 2023 Mini App. All rights reserved.'
      }]

  }
}
