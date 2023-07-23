import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/sea-battle/',
    build: {
        target: 'esnext'
    },
    plugins: [solidPlugin(), tsconfigPaths(), mkcert()],
    server: {
        https: true,
        port: 3000
    }
});
