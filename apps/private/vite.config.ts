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
    server: {
        port: 5002,
        proxy: {
            '/auth': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false
            },
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false
            }
        }
    }
}));