import { Page } from '~/components/layouts';
import { Hammer } from 'lucide-react';
import i18n from 'i18n';
import EmptyState from '~/components/empty-state';
import { useWindowScroll } from '@uidotdev/usehooks';
import Info from '~/config/info.json';
import { cn } from '~/utils';
import Separator from '~/components/separator';
import Button from '~/components/button';
import { useNavigate } from 'react-router-dom';

export const path = '/';
export const element = Home;

function Home() {
	const [{ y }, setScroll] = useWindowScroll();
	const navigate = useNavigate();

	return <Page
		className='border-opac'
	>
		<div className='flex items-center gap-10 my-12'>
			<img className='w-1/2 select-none' src='/img/hero.png' />
			<div className='flex items-start flex-col gap-5'>
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
		{/* <EmptyState icon={<Hammer size={250} />} message={i18n.Messages.WORK_IN_PROGRESS} /> */}
	</Page>;
};;