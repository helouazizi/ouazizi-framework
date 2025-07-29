import { Footer } from './Footer.js';
import { Header } from './Header.js';

export function Home(state) {
  const message = state.get('message');

  return {
    tag: 'div',
    attrs: { class: 'home' },
    children: [
      Header(state),
      {
        tag: 'main',
        attrs: { class: 'main' },
        children: [
          {
            tag: 'h1',
            attrs: { class: '' },
            text: 'Welcome to the Home Page'
          },
          {
            tag: 'p',
            attrs: { class: 'main p' },
            text: message
          }
        ]
      },

      Footer(state)
    ]
  };
}