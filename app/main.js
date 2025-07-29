import {
    State,
    Router,
    Renderer
} from '../src/index.js';
import { Home } from './components/Home.js';

const renderer = new Renderer();

const state = new State({
    route: location.hash || '#/',
    mesaage : 'Welcome to the mini  App',
});


function updateRoute() {
    const route = location.hash || '#/';
    state.set('route', route);
    renderApp();
}

function renderApp() {
    renderer.render('#root', Home(state));
}

const router = new Router({
    '/': () => {
        state.set('message', 'Welcome to the Home Page');
        updateRoute();
    },
    
    '/about': () => {
        state.set('message', 'This is the About Page');
        updateRoute();
    },
    '/contact': () => {
        state.set('message', 'This is the Contact Page');
        updateRoute();
    }
});

window.addEventListener('DOMContentLoaded', () => {
    router.init();
    renderApp();
});

window.addEventListener('hashchange', updateRoute);

state.subscribe(['message', 'route'], renderApp);


