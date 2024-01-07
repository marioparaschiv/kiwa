import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '~/components/dropdown-menu';
import { Button, type ButtonProps } from '~/components/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '~/hooks';
import { cn } from '~/utils';
import i18n from 'i18n';

export default function ModeToggle(props: ButtonProps) {
	const { setTheme, rawTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button {...props} variant='outline' size='icon' className={cn('flex basis-auto shrink-0', props.className)}>
					<Sun width={18} className='rotate-0 scale-100 transition-transform delay-100 dark:-rotate-90 dark:scale-0' />
					<Moon height={18} className='absolute rotate-90 scale-0 transition-transform delay-100 dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{i18n.Messages.APPEARANCE}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={rawTheme === 'light'}
					onClick={() => setTimeout(() => setTheme('light'), 100)}
				>
					{i18n.Messages.LIGHT}
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={rawTheme === 'dark'}
					onClick={() => setTimeout(() => setTheme('dark'), 100)}
				>
					{i18n.Messages.DARK}
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={rawTheme === 'system'}
					onClick={() => setTimeout(() => setTheme('system'), 100)}
				>
					{i18n.Messages.SYSTEM}
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
