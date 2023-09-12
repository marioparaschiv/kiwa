import Separator from '~/components/separator';
import { Page } from '~/components/layouts';
import i18n from 'i18n';

export const path = '/';
export const element = Home;

function Home() {
	return <Page>
		<img className='w-1/4 drop-shadow-2xl' src='/img/bubble-tea.webp' />
		{/* home page */}
		<Separator className='my-5 mx-60 w-auto' />
		{i18n.Messages.COMMITMENT_TO_QUALITY}
	</Page>;
}