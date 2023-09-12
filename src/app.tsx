import { ThemeProvider, IntlProvider } from '~/components/providers';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import * as Pages from '~/pages';

const routes = Object.values(Pages).map(({ path, element: Component }: Pages.Page) => ({ path, element: <Component /> }));
const router = createHashRouter(routes);

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
