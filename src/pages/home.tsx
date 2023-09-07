import Separator from '~/components/separator';
import { Page } from '~/components/layouts';

export const path = '/';
export const element = Home;

function Home() {
	return <Page>
		<img className='w-1/4 drop-shadow-2xl' src='/img/bubble-tea.webp' />
		{/* home page */}
		<Separator className='my-5 mx-60 w-auto' />
	</Page>;
}