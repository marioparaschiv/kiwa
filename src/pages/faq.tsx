import Footer from '~/components/footer';
import Header from '~/components/header';

export const path = '/faq';
export const element = FAQ;

function FAQ() {
	return <div>
		<Header />
		<div className='p-5 min-h-[100vh]'>
			faq
		</div>
		<Footer />
	</div>;
}