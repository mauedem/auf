import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://109.71.14.210',
                changeOrigin: true,
                secure: false,
            },
            '/media': {
                target: 'http://109.71.14.210',
                changeOrigin: true,
            },
        },
        historyApiFallback: true, // Перенаправление всех запросов на index.html
    },
})
