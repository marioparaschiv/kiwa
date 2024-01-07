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
		<div className='md:flex-row flex-col flex items-center gap-1 md:gap-16 my-12 justify-center'>
			<img className='w-screen md:w-1/2 select-none' src='/img/hero.png' />
			<div className='flex items-center flex-col gap-5 md:items-start'>
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
					{Info.Name}
				</h1>
				<h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
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
		<div className='mt-5'>

			{/* <img className='w-screen md:w-1/2 select-none' src='/img/cropped-main-page.png' /> */}
		</div>
	</Page>;
};