import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '~/components/dropdown-menu';
import { Button, type ButtonProps } from '~/components/button';
import { useLocalization } from '~/hooks';
import { Languages } from 'lucide-react';
import Locales from '~/../i18n';
import { cn } from '~/utils';

export default function ModeToggle(props: ButtonProps) {
	const { locale, setLocale, Messages } = useLocalization();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button {...props} variant='outline' size='icon' className={cn('flex basis-auto shrink-0', props.className)}>
					<Languages width={18} height={18} />
					<span className='sr-only'>Change language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{Messages.LANGUAGE}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{Object.keys(Locales).map(code => <DropdownMenuCheckboxItem
					key={code}
					checked={code === locale}
					onClick={() => setLocale(code)}
				>
					{Messages[code as keyof typeof Messages]}
				</DropdownMenuCheckboxItem>)}
			</DropdownMenuContent>
		</DropdownMenu >
	);
}
