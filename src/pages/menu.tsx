import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/components/dropdown-menu';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/card';
import { LucideListFilter, SearchX, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ImageModal from '~/components/image-modal';
import EmptyState from '~/components/empty-state';
import { useTranslation } from 'react-i18next';
import { Page } from '~/components/layouts';
import { useMemo, useState } from 'react';
import Button from '~/components/button';
import Input from '~/components/input';
import Badge from '~/components/badge';
import Tags from '~/config/tags.json';
import List from '~/config/menu.json';
import Info from '~/config/info.json';
import { cn } from '~/utils';


export const path = '/menu';
export const element = Menu;

const tags = [...new Set(List.flatMap(item => item.tags))].map(getTagByName).filter(Boolean);
const categories = [...new Set(List.flatMap(item => item.category))].filter(Boolean);
const tagCategories = [...new Set(tags.map(tag => tag.category))];

function Menu() {
	// Pre-defined state
	const [params, setParams] = useSearchParams();
	const { t, i18n } = useTranslation();

	const param = params.get('tags');

	// State
	const filter = param?.length ? Object.fromEntries(param.split(',').map(t => ([t, true]))) : {};
	const [filters, setFilters] = useState<Record<number, boolean>>(filter);
	const [search, setSearch] = useState('');

	const hasFilter = Object.keys(filters).length;

	// Data
	const list = useMemo(() => List.filter(item => {
		const name = t(item.name);
		const description = item.description && t(item.description);

		if (search) {
			if ([name?.toLowerCase(), description?.toLowerCase()].some(property => property?.includes(search.toLowerCase()))) {
				return true;
			} else {
				return false;
			}
		}

		if (hasFilter && item.tags.some((tag: any) => (tag = getTagByName(tag)) && filters[tag.id])) {
			return true;
		} else if (hasFilter) {
			return false;
		}

		return true;
	}).sort((a, b) => {
		const fName = t(a.name);
		const sName = t(b.name);

		if (fName < sName) {
			return -1;
		}

		if (fName > sName) {
			return 1;
		}

		return 0;
	}), [filters, search, i18n.language]);

	const currency = new Intl.NumberFormat(Info.DefaultLanguage, {
		style: 'currency',
		currency: Info.Currency
	});

	function toggleFilter(filterId: number) {
		const payload = { ...filters };

		if (filters[filterId]) {
			delete payload[filterId];
		} else {
			payload[filterId] = true;
		}

		const keys = Object.keys(payload);

		if (keys.length) {
			params.set('tags', keys.join(','));
		} else {
			params.delete('tags');
		}

		setFilters(payload);
		setParams(params);
	}

	return <Page section={t('MENU')} className='gap-0 mt-3 py-0'>
		<div className='top-0 sticky flex gap-3 bg-background mb-5 py-3 w-full h-full z-10'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={hasFilter ? 'default' : 'outline'} size='icon' aria-label={t('FILTERS')} className='flex basis-auto shrink-0'>
						<LucideListFilter width={18} height={18} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='min-w-[10rem]' align='start'>
					<DropdownMenuLabel>
						{t('FILTERS')}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{tagCategories.map((category, index) => <div key={category}>
						<DropdownMenuLabel>
							{t(category) ?? 'Unknown'}
						</DropdownMenuLabel>
						{tags.filter(t => t!.category === category).filter(Boolean).map(tag => {
							return <DropdownMenuCheckboxItem
								key={tag.name}
								checked={filters[tag!.id]}
								onSelect={(e) => e.preventDefault()}
								onCheckedChange={() => toggleFilter(tag.id)}
							>
								{t(tag.name) ?? 'Unknown'}
							</DropdownMenuCheckboxItem>;
						})}
						{index !== (tagCategories.length - 1) && <DropdownMenuSeparator />}
					</div>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<Input
				className='flex-grow'
				placeholder={t('SEARCH_MENU')}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
		{list.length ? categories.sort((a, b) => Info.MenuOrder.indexOf(a) - Info.MenuOrder.indexOf(b)).map((category, index) => {
			const items = list.filter(i => i.category === category);
			if (!items.length) return null;

			return <div key={category} className={cn('flex flex-col gap-5', index !== 0 && 'mt-10')}>
				<h3 className='scroll-m-20 font-semibold text-2xl tracking-tight'>
					{t(category, { ns: 'menu' }) ?? 'Unknown'}
				</h3>
				<div className='gap-5 grid grid-cols-[repeat(auto-fill,minmax(21rem,1fr))] overflow-hidden'>
					{items.map(item =>
						<Card key={item.name} className='w-auto h-auto bg-transparent justify-center'>
							<CardHeader className='p-0'>
								{!item.hideImage && /* <Link
									className='relative overflow-hidden mb-2 max-w-auto'
									to={item.image}
								> */
									/* <div className='absolute w-full h-full' /> */
									<ImageModal
										loading='eager'
										decoding='async'
										onError={(e) => (e.target as HTMLImageElement).src = '/img/product/placeholder.png'}
										alt={t(item.name) ?? 'Unknown'}
										className='dark:text-white text-black bg-secondary border-b mb-2 rounded-lg rounded-b-none object-cover min-h-[225px] max-h-[225px] md:min-h-[275px] md:max-h-[275px] w-full'
										src={item.image ?? '/img/product/placeholder.png'}
									/>
								/* </Link> */}
								{<div className={cn('flex gap-2 items-center px-6 pb-2 overflow-hidden', !item.description && !item.hideImage && 'pb-4', item.hideImage && 'p-4')}>
									{item.quantity && <p className='flex items-center text-base text-muted-foreground'>
										<X size={12} /> {item.quantity}
									</p>}
									<h3 className='font-semibold text-xl text-primary flex items-center gap-1'>
										{t(item.name, { ns: 'menu' }) ?? 'Unknown'}
									</h3>
									{item.price !== void 0 && <p className='ml-auto font-semibold text-lg break-all leading-7 whitespace-nowrap text-muted-foreground'>
										{currency.format(item.price)}
									</p>}
								</div>}
							</CardHeader>
							{item.description && <CardContent className={cn('flex-1', item.hideImage && 'p-4 pt-0')}>
								<p className='break-words leading-7'>
									{t(item.description, { ns: 'menu' }) ?? 'Unknown'}
								</p>
							</CardContent>}
							{item.tags && item.tags.length !== 0 && <CardFooter className='flex justify-between items-center'>
								<div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
									{item.tags.map(name => {
										const tag = getTagByName(name);
										if (!tag) return null;

										const text = t(tag.name, { ns: 'menu' }) ?? 'Unknown';

										return <Badge
											role='button'
											aria-label={t('TOGGLE_FILTER', { name: text })}
											key={tag.name + item.name}
											className={cn('select-none break-normal whitespace-nowrap cursor-pointer', filters[tag.id] && 'bg-primary/70')}
											onClick={() => toggleFilter(tag.id)}
										>
											{text}
										</Badge>;
									}).filter(Boolean)}
								</div>
							</CardFooter>}
						</Card>
					)}
				</div>
			</div>;
		}) : <EmptyState icon={<SearchX size={250} strokeWidth={1} />} message={t('NOT_FOUND')} />}
		<div className='mb-10' />
	</Page>;
}

function getTagByName(name: string) {
	return Tags.find(tag => tag.name === name);
}