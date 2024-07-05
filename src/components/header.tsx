import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '~/components/navigation-menu';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTrigger } from '~/components/drawer';
import LanguageSwitcher from '~/components/language-switcher';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeSwitcher from '~/components/theme-switcher';
import Separator from '~/components/separator';
import Button from '~/components/button';
import Info from '~/config/info.json';
import { Menu } from 'lucide-react';
import { useTheme } from '~/hooks';
import { useState } from 'react';
import { cn } from '~/utils';
import i18n from 'i18n';

function Header(props: React.HTMLProps<HTMLElement>) {
	const navigate = useNavigate();
	const location = useLocation();
	const { theme } = useTheme();

	const [sidebar, setSidebar] = useState(false);

	return <nav {...props} key='header' className={cn('sticky h-18 flex px-[20px] py-[10px] items-center gap-[10px] border-b text-card-foreground shadow-sm bg-background z-10', props.className)}>
		<div className='container flex h-14 items-center gap-[10px] p-0'>
			<Link className='flex items-center gap-[10px] mr-[10px] cursor-pointer select-none hover:opacity-75 transition-opacity' to='/'>
				<img loading='lazy' decoding='async' alt='logo' src={`/img/logo-${theme}.webp`} width={56} height={56} />
			</Link>
			<Separator orientation='vertical' className='h-5 hidden sm:flex' />
			<NavigationMenu className='w-full hidden sm:flex md:items-center md:w-auto'>
				<NavigationMenuList>
					<NavigationMenuItem className='cursor-pointer select-none'>
						<NavigationMenuLink href='/' className='font-semibold bg-transparent'>
							{i18n.Messages.HOME}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className='cursor-pointer select-none'>
						<NavigationMenuLink href='/menu' className='font-semibold bg-transparent'>
							{i18n.Messages.MENU}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className='cursor-pointer select-none'>
						<NavigationMenuLink href='/reserve' className='font-semibold bg-transparent'>
							{i18n.Messages.RESERVE}
						</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className='cursor-pointer select-none w-full'>
						<NavigationMenuLink href='/faq' className='font-semibold bg-transparent'>
							{i18n.Messages.FAQ}
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className='ml-auto flex flex-row gap-3 items-center flex-shrink-0 flex-grow-0'>
				<LanguageSwitcher />
				<ThemeSwitcher />
				<Drawer direction='top' open={sidebar} onOpenChange={setSidebar}>
					<DrawerTrigger asChild className='sm:hidden flex'>
						<Button
							variant='outline'
							size='icon'
							aria-label={i18n.Messages.MENU}
						>
							<Menu size={18} />
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader className='justify-center flex w-full items-center gap-2 mt-4'>
							<img className='select-none' loading='eager' decoding='async' alt='logo' src={`/img/logo-${theme}.webp`} width={64} height={64} />
							<h1 className='scroll-m-20 text-4xl font-semibold transition-colors first:mt-0 font-logo'>
								{Info.Name}
							</h1>
						</DrawerHeader>
						<DrawerDescription asChild>
							<div className='mt-4 flex flex-col gap-2 px-6'>
								<a
									href='/'
									onClick={e => (e.preventDefault(), navigate('/'))}
								>
									<Button
										className='flex items-center w-full select-none'
										variant='outline'
										disabled={location.pathname === '/'}
										aria-label={i18n.Messages.HOME}
									>
										{i18n.Messages.HOME}
									</Button>
								</a>
								<a
									href='/#/menu'
									onClick={e => (e.preventDefault(), navigate('/menu'))}
								>
									<Button
										className='flex items-center w-full select-none'
										variant='outline'
										disabled={location.pathname === '/menu'}
										aria-label={i18n.Messages.MENU}
									>
										{i18n.Messages.MENU}
									</Button>
								</a>
								<a
									href='/#/reserve'
									onClick={e => (e.preventDefault(), navigate('/reserve'))}
								>
									<Button
										className='flex items-center w-full select-none'
										variant='outline'
										disabled={location.pathname === '/reserve'}
										aria-label={i18n.Messages.RESERVE}
									>
										{i18n.Messages.RESERVE}
									</Button>
								</a>
								<a
									href='/#/faq'
									onClick={e => (e.preventDefault(), navigate('/faq'))}
								>
									<Button
										className='flex items-center w-full select-none'
										variant='outline'
										disabled={location.pathname === '/faq'}
										aria-label={i18n.Messages.FAQ}
									>
										{i18n.Messages.FAQ}
									</Button>
								</a>
							</div>
						</DrawerDescription>
					</DrawerContent>
				</Drawer>
			</div>
		</div>
	</nav>;
}

export default Header;