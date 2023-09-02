import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '~/components/dropdown-menu';
import { useTheme } from '~/components/providers/theme-provider';
import { Button } from '~/components/button';
import { Moon, Sun } from 'lucide-react';
import i18n from 'i18n';

export default function ModeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon' className='flex basis-auto shrink-0'>
					<Sun width={18} className=' rotate-0 scale-100 transition-transform delay-100 dark:-rotate-90 dark:scale-0' />
					<Moon height={18} className='absolute rotate-90 scale-0 transition-transform delay-100 dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{i18n.Messages.APPEARANCE}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={theme === 'light'}
					onClick={() => setTheme('light')}
				>
					{i18n.Messages.LIGHT}
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === 'dark'}
					onClick={() => setTheme('dark')}
				>
					{i18n.Messages.DARK}
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === 'system'}
					onClick={() => setTheme('system')}
				>
					{i18n.Messages.SYSTEM}
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
