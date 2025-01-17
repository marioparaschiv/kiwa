import { useTranslation } from 'react-i18next';
import type { ComponentProps } from 'react';
import { Helmet } from 'react-helmet-async';
import useScroll from '~/hooks/use-scroll';
import Header from '~/components/header';
import Footer from '~/components/footer';
import { ArrowUp } from 'lucide-react';
import Info from '~/config/info.json';
import { cn } from '~/utils';


interface PageProps {
	headerProps?: ComponentProps<typeof Header>;
	bodyProps?: React.HTMLProps<HTMLDivElement>;
	footerProps?: ComponentProps<typeof Footer>;
	wrapperClassName?: string;
	before?: JSX.Element;
	after?: JSX.Element;
	className?: string;
	section?: string;
}

function Page({ section, before, after, children, className, wrapperClassName, headerProps, footerProps, bodyProps, ...props }: React.PropsWithChildren<PageProps>) {
	const { t } = useTranslation();
	const [{ y }] = useScroll();

	return <div {...bodyProps}>
		<Helmet>
			<title>{section ? `${section} - ${Info.Name}` : Info.Name}</title>
		</Helmet>
		<Header {...(headerProps ?? {})} />
		{before ? before : ''}
		<div className={cn('px-[20px] py-[10px]', wrapperClassName)}>
			<main {...props} className={cn('container flex flex-col gap-[10px] min-h-[100vh] p-0 py-6', className)}>
				{children}
			</main>
		</div>
		{after ? after : ''}
		<Footer {...(footerProps ?? {})} />
		<button
			onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}
			aria-label={t('SCROLL_TO_TOP')}
			className={cn('fixed opacity-0 transition-all ease-in-out block bg-primary hover:bg-primary/75 shadow-2xl bottom-5 right-5 h-12 w-12 z-50 rounded-full ml-auto active:bg-secondary-foreground', y != null && y > 100 && 'opacity-100')}
		>
			<ArrowUp className='m-auto text-primary-foreground' />
		</button>
	</div>;
}

export default Page;
