import App from './app.svelte';

let result;

if (IS_SSR) {
    result = App.render();
} else {
    result = new App({
        // NOTE: only can be mounted at document.body
        target: document.body,
        hydrate: true,
    });
}

export default result;
