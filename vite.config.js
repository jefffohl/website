import { resolve } from 'path'
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                cv: resolve(__dirname, 'cv.html'),
            }
        }
    }
});