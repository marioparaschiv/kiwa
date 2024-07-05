import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import paths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	appType: 'mpa',
	plugins: [react({ devTarget: 'esnext' }), paths()],
	server: {
		host: true,
		port: 80,
	}
});
