import { Page } from '~/components/layouts';
import { useLocalization } from '~/hooks';
import Info from '~/config/info.json';
import { useMemo } from 'react';

export const path = '/';
export const element = Home;

function Home() {
	const { Messages } = useLocalization();

	const randomReview = useMemo(() => );

	return <Page headerProps={{ className: 'bg-background/75 backdrop-blur-md' }} wrapperClassName='bg-background/80 p-0' className='p-0 max-w-[unset] m-0 relative'>
		<img alt='' loading='eager' decoding='sync' width='100%' height='100%' className='absolute top-0 w-full h-full select-none object-cover min-w-0' src='/img/hero.png' />
		<div className='absolute w-full h-full bg-black/40 dark:bg-black/60 top-0' />
		<div className='absolute w-full h-full top-0 flex backdrop-blur-sm'>
			<div className='relative w-full h-full justify-center'>
				<div className='flex flex-col justify-center min-h-dvh items-center gap-12 flex-grow flex-shrink-0'>
					<h1 className='scroll-m-20 font-bold font-logo text-8xl md:text-9xl tracking-tight text-white'>
						{Info.Name}
					</h1>
					<h2 className='scroll-m-20 font-semibold text-2xl md:text-3xl tracking-tight text-white'>
						{Messages.COMMITMENT_TO_QUALITY}
					</h2>
					{Info.Reviews.map(review => <div>
						<h1>{review.name}</h1>
						<h2>{review.content}</h2>
					</div>)}
					{/* <div className='flex items-center gap-5'>
						<Link to='/reserve'>
							<Button aria-label={Messages.RESERVE} className='pointer-events-auto' size='lg'>
								{Messages.RESERVE}
							</Button>
						</Link>
						<Link to='/menu'>
							<Button aria-label={Messages.MENU} size='lg' variant='secondary'>
								{Messages.VIEW_MENU}
							</Button>
						</Link>
					</div> */}
				</div>
			</div>
		</div>
		{/* <div className='flex md:flex-row flex-col justify-center items-center flex-1 container gap-1 md:gap-10 my-20 min-w-0'>
			<div className='relative w-full h-full flex-grow'>
				<div className='flex flex-col justify-center items-center gap-12 flex-grow flex-shrink-0'>
					<h1 className='scroll-m-20 font-bold font-logo text-9xl tracking-tight'>
						{Info.Name}
					</h1>
					<h2 className='scroll-m-20 font-semibold text-3xl tracking-tight'>
						{Messages.COMMITMENT_TO_QUALITY}
					</h2>
					{/* <div className='flex items-center gap-5'>
						<Link to='/reserve'>
							<Button aria-label={Messages.RESERVE} className='pointer-events-auto' size='lg'>
								{Messages.RESERVE}
							</Button>
						</Link>
						<Link to='/menu'>
							<Button aria-label={Messages.MENU} size='lg' variant='secondary'>
								{Messages.VIEW_MENU}
							</Button>
						</Link>
					</div> */}
	</Page >;
}