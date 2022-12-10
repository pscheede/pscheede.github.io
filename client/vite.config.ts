import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import { default as vueI18n } from "@intlify/vite-plugin-vue-i18n";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueI18n()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
})
