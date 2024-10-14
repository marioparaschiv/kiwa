import { Calendar, LucideMenuSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Page } from '~/components/layouts';
import Button from '~/components/button';
import { Link } from 'react-router-dom';
import Info from '~/config/info.json';


export const path = '/';
export const element = Home;

function Home() {
	const { t } = useTranslation();

	return <Page headerProps={{ className: 'bg-background/75 backdrop-blur-md' }} wrapperClassName='bg-background/80 p-0' className='p-0 max-w-[unset] m-0 relative'>
		<img alt='' loading='eager' decoding='sync' width='100%' height='100%' className='absolute top-0 w-full h-full select-none object-cover min-w-0' src='/img/hero.webp' />
		<div className='absolute w-full h-full bg-black/40 dark:bg-black/60 top-0' />
		<div className='absolute w-full h-full top-0 flex backdrop-blur-sm'>
			<div className='relative w-full h-full justify-center'>
				<div className='flex flex-col justify-center min-h-dvh items-center gap-12 flex-grow flex-shrink-0'>
					<h1 className='scroll-m-20 font-bold font-logo text-8xl md:text-9xl tracking-tight text-white'>
						{Info.Name}
					</h1>
					<h2 className='scroll-m-20 font-semibold text-2xl md:text-3xl tracking-tight text-white'>
						{t('COMMITMENT_TO_QUALITY')}
					</h2>
					<div className='flex items-center gap-5'>
						<Link to='/reserve'>
							<Button aria-label={t('RESERVE')} className='rounded-full flex gap-2 items-center' size='lg'>
								<Calendar size={18} />
								{t('RESERVE')}
							</Button>
						</Link>
						<Link to='/menu'>
							<Button aria-label={t('VIEW_MENU')} className='rounded-full flex gap-2 items-center' size='lg' variant='link'>
								<LucideMenuSquare size={18} />
								{t('VIEW_MENU')}
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	</Page >;
}