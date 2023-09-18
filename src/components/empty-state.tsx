import { cn } from '~/utils';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
	icon: JSX.Element;
	message: string;
}

function EmptyState({ icon, message, className, ...props }: EmptyStateProps) {
	return <div {...props} className={cn('flex justify-center items-center w-full h-full flex-col gap-3 m-auto', className)}>
		{icon}
		<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
			{message}
		</h1>
	</div>;
}

export default EmptyState;