import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(()=>({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
    },
    base: '/',
    build: {
        assetsDir: './static',
        outDir: 'dist',
    },
}));