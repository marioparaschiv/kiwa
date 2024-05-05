import Separator from '~/components/separator';
import { useNavigate } from 'react-router-dom';
import { Page } from '~/components/layouts';
import Button from '~/components/button';
import i18n from 'i18n';

import Info from '~/config/info.json';

export const path = '/';
export const element = Home;

function Home() {
	const navigate = useNavigate();

	return <Page className='p-5 md:p-10'>
		<div className='flex md:flex-row flex-col justify-center items-center gap-1 md:gap-16 my-20'>
			<img className='w-screen select-none' src='/img/hero.png' />
			<div className='flex flex-col items-center md:items-start gap-5'>
				<h1 className='scroll-m-20 font-bold text-4xl lg:text-5xl tracking-tight'>
					{Info.Name}
				</h1>
				<h4 className='scroll-m-20 font-semibold text-xl tracking-tight'>
					{i18n.Messages.COMMITMENT_TO_QUALITY}
				</h4>
				<div className='flex items-center gap-5'>
					<Button size='lg' onClick={() => navigate('/reservation')}>
						{i18n.Messages.RESERVE}
					</Button>
					<Button size='lg' onClick={() => navigate('/menu')} variant='secondary'>
						{i18n.Messages.MENU}
					</Button>
				</div>
			</div>
		</div>
		<Separator className='opacity-50' />
	</Page>;
}