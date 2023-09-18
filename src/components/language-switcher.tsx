import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '~/components/dropdown-menu';
import { Button } from '~/components/button';
import { Languages } from 'lucide-react';
import i18n, { useLocale } from 'i18n';
import Locales from '~/../i18n';

export default function ModeToggle() {
	const { locale, setLocale } = useLocale();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline' size='icon' className='flex basis-auto shrink-0'>
					<Languages width={18} height={18} />
					<span className='sr-only'>Change language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>{i18n.Messages.LANGUAGE}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{Object.keys(Locales).map(code => <DropdownMenuCheckboxItem
					key={code}
					checked={code === locale}
					onClick={() => setLocale(code)}
				>
					{i18n.Messages[code as keyof typeof i18n.Messages]}
				</DropdownMenuCheckboxItem>)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
