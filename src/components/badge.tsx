import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '~/utils';

const BadgeVariants = cva(
	'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
				secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
				destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
				outline: 'text-foreground'
			}
		},
		defaultVariants: {
			variant: 'default',
		}
	}
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof BadgeVariants> {

}

function Badge({ className, variant, ...props }: BadgeProps) {
	return (
		<div className={cn(BadgeVariants({ variant }), className)} {...props} />
	);
}

export default Badge;
export { Badge, BadgeVariants };
