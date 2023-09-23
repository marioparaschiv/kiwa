import { useWindowScroll } from '@uidotdev/usehooks';
import Footer from '~/components/footer';
import Header from '~/components/header';
import { Helmet } from 'react-helmet';
import Info from '~/config/info.json';
import { cn } from '~/utils';
import { ArrowUp } from 'lucide-react';

interface PageProps {
	className?: string;
	before?: JSX.Element;
	after?: JSX.Element;
	section?: string;
}

function Page({ section, before, after, children, className, ...props }: React.PropsWithChildren<PageProps>) {
	const [{ y }, scrollTo] = useWindowScroll();

	return <div {...props}>
		<Helmet>
			<title>{section ? `${section} - ${Info.Name}` : Info.Name}</title>
		</Helmet>
		<Header />
		{before ? before : ''}
		<div className={cn('container flex flex-col gap-[10px] p-10 min-h-[100vh] mt-5', className)}>
			{children}
		</div>
		{after ? after : ''}
		<Footer />
		<button
			onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
			className={cn('opacity-0 transition-opacity ease-in-out block bg-primary shadow-2xl bottom-5 right-5 sticky h-12 w-12 z-50 rounded-full ml-auto active:bg-secondary-foreground animate-in animate-out', y != null && y > 100 && 'opacity-100')}
		>
			<ArrowUp className='text-primary-foreground m-auto' />
		</button>
	</div>;
}

export default Page;