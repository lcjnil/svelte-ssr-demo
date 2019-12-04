import App from './app.svelte';

let result;

if (IS_SSR) {
    result = App.render();
} else {
    result = new App({
        // 只能挂在在 document.body 上
        target: document.body,
        hydrate: true,
    });
}

export default result;
