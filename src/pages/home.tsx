import Footer from '~/components/footer';
import Header from '~/components/header';
import Separator from '~/components/separator';

export const path = '/';
export const element = Home;

function Home() {
	return <div>
		<Header />
		<div className='min-h-[100vh]'>
			<img className='w-1/4 drop-shadow-2xl' src='/img/bubble-tea.webp' />
			{/* home page */}
			<Separator className='my-5 mx-60 w-auto' />
		</div>
		<Footer />
	</div>;
}