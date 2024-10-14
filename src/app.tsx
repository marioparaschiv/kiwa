import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '~/components/providers';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from '~/components/toaster';
import * as Pages from '~/pages';
import i18n from '~/i18n';


const routes = Object.values(Pages).map(({ path, element: Component }: Pages.Page) => ({ path, element: <Component /> }));
const router = (import.meta.env.DEV ? createHashRouter : createBrowserRouter)(routes);

function App() {
	return (
		<I18nextProvider i18n={i18n}>
			<HelmetProvider>
				<ThemeProvider defaultTheme='system'>
					<RouterProvider router={router} />
					<Toaster />
				</ThemeProvider>
			</HelmetProvider>
		</I18nextProvider>
	);
}

export default App;
