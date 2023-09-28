import { useWindowScroll } from '@uidotdev/usehooks';
import type { ComponentProps } from 'react';
import Footer from '~/components/footer';
import Header from '~/components/header';
import { ArrowUp } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Info from '~/config/info.json';
import { cn } from '~/utils';

interface PageProps {
	headerProps?: ComponentProps<typeof Header>;
	bodyProps?: React.HTMLProps<HTMLDivElement>;
	footerProps?: ComponentProps<typeof Footer>;
	before?: JSX.Element;
	after?: JSX.Element;
	className?: string;
	section?: string;
}

function Page({ section, before, after, children, className, headerProps, footerProps, bodyProps, ...props }: React.PropsWithChildren<PageProps>) {
	const [{ y }, scrollTo] = useWindowScroll();

	return <div {...bodyProps}>
		<Helmet>
			<title>{section ? `${section} - ${Info.Name}` : Info.Name}</title>
		</Helmet>
		<Header {...(headerProps ?? {})} />
		{before ? before : ''}
		<div {...props} className={cn('container flex flex-col gap-[10px] p-10 min-h-[100vh] mt-5', className)}>
			{children}
		</div>
		{after ? after : ''}
		<Footer {...(footerProps ?? {})} />
		<button
			onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}
			className={cn('fixed opacity-0 transition-opacity ease-in-out block bg-primary shadow-2xl bottom-5 right-5 h-12 w-12 z-50 rounded-full ml-auto active:bg-secondary-foreground', y != null && y > 100 && 'opacity-100')}
		>
			<ArrowUp className='text-primary-foreground m-auto' />
		</button>
	</div>;
}

export default Page;
