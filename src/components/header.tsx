import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '~/components/navigation-menu';
import { CalendarCheck, HelpCircle, Home, Menu, ScrollText } from 'lucide-react';
import { useTheme } from '~/components/providers/theme-provider';
import LanguageSwitcher from '~/components/language-switcher';
import ThemeSwitcher from '~/components/theme-switcher';
import Separator from '~/components/separator';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/button';
import { useState } from 'react';
import { cn } from '~/utils';
import i18n from 'i18n';

function Header() {
	const [links, setLinks] = useState(false);
	const navigate = useNavigate();
	const { theme } = useTheme();

	return <>
		<nav className='sticky h-18 flex px-[20px] p-[10px] items-center gap-[10px] border-b text-card-foreground shadow-sm bg-background z-10'>
			<div className='container flex h-14 items-center gap-[10px] p-0 md:h-14'>
				<div
					className='flex items-center gap-[10px] mr-[10px] cursor-pointer hover:opacity-75 transition-opacity'
					onClick={() => navigate('/')}
				>
					<img src={`/img/logo-${theme}.png`} width={56} height={56} />
					<h3 className='select-none font-logo scroll-m-20 text-3xl font-semibold tracking-tight'>
						Kiwa
					</h3>
				</div>
				<Separator orientation='vertical' className='h-5 hidden sm:flex' />
				<NavigationMenu className='w-full hidden sm:flex md:items-center md:w-auto'>
					<NavigationMenuList>
						<NavigationMenuItem className='cursor-pointer select-none' onClick={() => navigate('/')}>
							<NavigationMenuLink className='uppercase font-semibold'>
								{i18n.Messages.HOME}
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem className='cursor-pointer select-none' onClick={() => navigate('/menu')}>
							<NavigationMenuLink className='uppercase font-semibold'>
								{i18n.Messages.MENU}
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem className='cursor-pointer select-none' onClick={() => navigate('/reservation')}>
							<NavigationMenuLink className='uppercase font-semibold'>
								{i18n.Messages.RESERVE}
							</NavigationMenuLink>
						</NavigationMenuItem>
						<NavigationMenuItem className='cursor-pointer select-none w-full' onClick={() => navigate('/faq')}>
							<NavigationMenuLink className='uppercase font-semibold'>
								{i18n.Messages.FAQ}
							</NavigationMenuLink>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className='ml-auto flex flex-row gap-3 items-center flex-shrink-0 flex-grow-0'>
					<LanguageSwitcher />
					<ThemeSwitcher />
					<Button variant='outline' size='icon' className='sm:hidden flex' onClick={() => setLinks(!links)} >
						<Menu />
					</Button>
				</div>
			</div>
		</nav>
		<div className={cn('transition-height sm:hidden flex-col w-full border-b border-border p-5 gap-2', links ? 'flex h-full' : 'h-0 hidden')} key='nav-menu-dropdown'>
			<div className='flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer' onClick={() => navigate('/')}>
				<Home />
				{i18n.Messages.HOME}
			</div>
			<div className='flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer' onClick={() => navigate('/menu')}>
				<ScrollText />
				{i18n.Messages.MENU}
			</div>
			<div className='flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer' onClick={() => navigate('/reservation')}>
				<CalendarCheck />
				{i18n.Messages.RESERVE}
			</div>
			<div className='flex items-center w-full hover:bg-secondary transition-colors p-2 rounded-md gap-3 select-none cursor-pointer' onClick={() => navigate('/faq')}>
				<HelpCircle />
				{i18n.Messages.FAQ}
			</div>
		</div>
	</>;
}

export default Header;