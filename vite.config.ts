import react from '@vitejs/plugin-react-swc';
import paths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	appType: 'mpa',
	plugins: [react(), paths()],
	build: {
		sourcemap: 'inline'
	},
	server: {
		host: true,
		port: 80,
	}
});
