import {createRouter, createWebHistory} from "vue-router";

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
            component: () => import('./components/gallery/Gallery.vue'),
        },
        {
            path: '/image/:img/show',
            component: () => import('./components/gallery/Gallery.vue'),
        },
        {
            path: '/test',
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
        },
    ]
});

export default router;