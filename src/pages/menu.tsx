import { Page } from '~/components/layouts';
import i18n from 'i18n';

export const path = '/menu';
export const element = Menu;

function Menu() {
	return <Page
		section={i18n.Messages.MENU}
		before={<div className='w-full bg-secondary h-52 flex justify-center items-center'>
			<h2 className='scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0'>
				{i18n.Messages.MENU}
			</h2>
		</div>}
	>
		menu
	</Page>;
}