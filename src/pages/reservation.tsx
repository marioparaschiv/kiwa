import Footer from '~/components/footer';
import Header from '~/components/header';

export const path = '/reservation';
export const element = Reservation;

function Reservation() {
	return <div>
		<Header />
		<div className='p-5 min-h-[100vh]'>
			reservations
		</div>
		<Footer />
	</div>;
}