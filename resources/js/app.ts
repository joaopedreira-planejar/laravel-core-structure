import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue3';
import type { DefineComponent } from 'vue';
import { createApp, h } from 'vue';
import { initializeTheme } from './composables/useAppearance';
import { configureEcho } from '@laravel/echo-vue';
import Layout from "@/layouts/Layout.vue";

configureEcho({
    broadcaster: 'reverb',
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const globalComponents = import.meta.glob<{
    default: DefineComponent
}>('./components/globals/*.vue', { eager: true })

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: name => {
        const pages = import.meta.glob<{
            default: DefineComponent & { layout?: unknown }
        }>('./pages/**/*.vue', { eager: true })

        const page = pages[`./pages/${name}.vue`]

        page.default.layout = page.default.layout || Layout

        return page
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            .use(plugin)

        Object.entries(globalComponents).forEach(([path, definition]) => {
            const file = path.split('/').pop();
            if (!file) return;

            const componentName = "x-" + file.toLowerCase().replace(/\.vue$/, '');

            if (!definition?.default) return;

            app.component(componentName, definition.default);
        });

        app.mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on page load...
initializeTheme();
