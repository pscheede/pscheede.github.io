import {createRouter, createWebHistory} from "vue-router";

import Home from './components/Home.vue'
import Gallery from './components/gallery/Gallery.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:catchAll(.*)',
            redirect: '/',
        },
        {
            path: '/',
            component: Home,
        },
        {
            path: '/gallery',
            component: Gallery,
        },
        {
            path: '/image/:img/show',
            component: Gallery,
        },
    ]
});

export default router;