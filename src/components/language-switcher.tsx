import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '~/components/dropdown-menu';
import { Button, type ButtonProps } from '~/components/button';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { cn } from '~/utils';


export default function ModeToggle(props: ButtonProps) {
	const { i18n, t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button {...props} variant='outline' size='icon' className={cn('flex basis-auto shrink-0', props.className)}>
					<Languages width={18} height={18} />
					<span className='sr-only'>Change language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>
					{t('LANGUAGE')}
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{(i18n.options.supportedLngs! as string[]).filter(lang => lang !== 'cimode').map(code => <DropdownMenuCheckboxItem
					key={code}
					checked={code === i18n.language}
					onClick={() => i18n.changeLanguage(code)}
				>
					{t(code)}
				</DropdownMenuCheckboxItem>)}
			</DropdownMenuContent>
		</DropdownMenu >
	);
}
