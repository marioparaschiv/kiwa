import Footer from '~/components/footer';
import Header from '~/components/header';

export const path = '/menu';
export const element = Menu;

function Menu() {
	return <div>
		<Header />
		<div className='p-5 min-h-[100vh]'>
			menu
		</div>
		<Footer />
	</div>;
}