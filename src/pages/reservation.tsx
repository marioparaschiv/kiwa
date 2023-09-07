import { useTheme } from '~/components/providers/theme-provider';
import { Page } from '~/components/layouts';
import i18n from 'i18n';

export const path = '/reservation';
export const element = Reservation;

function Reservation() {
	const { theme } = useTheme();

	return <Page
		section={i18n.Messages.RESERVE}
		before={<div className={`w-full bg-secondary h-52 flex justify-center items-center ${theme === 'dark' ? 'bg-hero-pattern-dark' : 'bg-hero-pattern-light'} bg-cover bg-scroll bg-center bg-no-repeat`}>
			<h2 className='scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0'>
				{i18n.Messages.RESERVE}
			</h2>
		</div>}
	>
		reservations
	</Page>;
}