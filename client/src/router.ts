import {createRouter, createWebHistory} from "vue-router";

import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        disableHeader?: boolean;
        disableFooter?: boolean;
    }
}

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:catchAll(.*)',
            redirect: '/',
        },
        {
            path: '/',
            component: () => import('./components/Home.vue'),
        },
        {
            path: '/about',
            component: () => import('./components/ActiveDevelopment.vue'),
        },
        {
            path: '/contact',
            component: () => import('./components/ActiveDevelopment.vue'),
        },
        {
            path: '/gallery',
            component: () => import('./components/gallery/AlbumOverview.vue'),
        },
        {
            name: 'gallery',
            path: '/albums/:albumSlug',
            component: () => import('./components/gallery/AlbumDetail.vue'),
            props: true,
        },
        {
            name: 'gallery-image',
            path: '/albums/:albumSlug/:img',
            component: () => import('./components/gallery/AlbumDetail.vue'),
            props: true,
            meta: { disableHeader: true, disableFooter: true },
        },
        {
            path: '/impressum',
            component: () => import('./components/Impressum.vue'),
        },
    ]
});

export default router;