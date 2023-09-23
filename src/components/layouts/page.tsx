import { Helmet } from 'react-helmet';
import Footer from '~/components/footer';
import Header from '~/components/header';
import Info from '~/config/info.json';
import { cn } from '~/utils';

interface PageProps {
	className?: string;
	before?: JSX.Element;
	after?: JSX.Element;
	section?: string;
}

function Page({ section, before, after, children, className, ...props }: React.PropsWithChildren<PageProps>) {
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
	</div>;
}

export default Page;