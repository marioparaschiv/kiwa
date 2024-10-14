import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '~/components/dropdown-menu';
import { Button, type ButtonProps } from '~/components/button';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '~/hooks';
import { cn } from '~/utils';


export default function ModeToggle(props: ButtonProps) {
	const { setTheme, rawTheme } = useTheme();
	const { t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button {...props} variant='outline' size='icon' className={cn('flex basis-auto shrink-0', props.className)}>
					<Sun size={18} className='rotate-0 scale-100 transition-transform delay-100 dark:-rotate-90 dark:scale-0' />
					<Moon size={18} className='absolute rotate-90 scale-0 transition-transform delay-100 dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>{t('CHANGE_APPEARANCE')}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{t('APPEARANCE')}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={rawTheme === 'light'}
					onClick={() => setTheme('light')}
				>
					{t('LIGHT')}
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={rawTheme === 'dark'}
					onClick={() => setTheme('dark')}
				>
					{t('DARK')}
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={rawTheme === 'system'}
					onClick={() => setTheme('system')}
				>
					{t('SYSTEM')}
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
