import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, IntlProvider } from '~/components/providers';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '~/components/toaster';
import * as Pages from '~/pages';

const routes = Object.values(Pages).map(({ path, element: Component }: Pages.Page) => ({ path, element: <Component /> }));
const router = createBrowserRouter(routes);

function App() {
	return (
		<HelmetProvider>
			<IntlProvider>
				<ThemeProvider defaultTheme='system'>
					<RouterProvider router={router} />
					<Toaster />
				</ThemeProvider>
			</IntlProvider>
		</HelmetProvider>
	);
}

export default App;
