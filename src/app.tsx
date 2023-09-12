import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider, IntlProvider } from '~/components/providers';
import * as Pages from '~/pages';

const routes = Object.values(Pages).map(({ path, element: Component }: Pages.Page) => ({ path, element: <Component /> }));
const router = createBrowserRouter(routes);

function App() {
	return (
		<IntlProvider>
			<ThemeProvider defaultTheme='system'>
				<RouterProvider router={router} />
			</ThemeProvider>
		</IntlProvider>
	);
}

export default App;
