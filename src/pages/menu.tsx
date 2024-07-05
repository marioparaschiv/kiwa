import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/components/dropdown-menu';
import { Card, CardContent, CardFooter, CardHeader } from '~/components/card';
import { LucideListFilter, SearchX } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import EmptyState from '~/components/empty-state';
import { Page } from '~/components/layouts';
import { useMemo, useState } from 'react';
import Button from '~/components/button';
import Input from '~/components/input';
import Badge from '~/components/badge';
import { useLocale } from '~/hooks';
import { cn } from '~/utils';
import i18n from 'i18n';

import Info from '~/config/info.json';
import List from '~/config/menu.json';
import Tags from '~/config/tags.json';

export const path = '/menu';
export const element = Menu;

const tags = [...new Set(List.flatMap(item => item.tags))].map(getTagByName).filter(Boolean);
const categories = [...new Set(List.flatMap(item => item.category))].filter(Boolean);
const tagCategories = [...new Set(tags.map(tag => tag.category))];

function Menu() {
	// Pre-defined state
	const [params, setParams] = useSearchParams();
	const param = params.get('tags');
	const { locale } = useLocale();

	// State
	const filter = param?.length ? Object.fromEntries(param.split(',').map(t => ([t, true]))) : {};
	const [filters, setFilters] = useState<Record<number, boolean>>(filter);
	const [search, setSearch] = useState('');

	const hasFilter = Object.keys(filters).length;

	// Data
	const list = useMemo(() => List.filter(item => {
		const name = i18n.Messages[item.name as keyof typeof i18n.Messages];
		const description = item.description && i18n.Messages[item.description as keyof typeof i18n.Messages];

		if (search) {
			if ([name.toLowerCase(), description?.toLowerCase()].some(property => property?.includes(search.toLowerCase()))) {
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
		const fName = i18n.Messages[a.name as keyof typeof i18n.Messages];
		const sName = i18n.Messages[b.name as keyof typeof i18n.Messages];

		if (fName < sName) {
			return -1;
		}

		if (fName > sName) {
			return 1;
		}

		return 0;
	}), [filters, search, locale]);

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

	return <Page section={i18n.Messages.MENU} className='gap-0 mt-3 py-0'>
		<div className='top-0 sticky flex gap-3 bg-background mb-5 py-3 w-full h-full'>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={hasFilter ? 'default' : 'outline'} size='icon' aria-label={i18n.Messages.FILTERS} className='flex basis-auto shrink-0'>
						<LucideListFilter width={18} height={18} />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='min-w-[10rem]' align='start'>
					<DropdownMenuLabel>
						{i18n.Messages.FILTERS}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{tagCategories.map((category, index) => <div key={category}>
						<DropdownMenuLabel>
							{i18n.Messages[category as keyof typeof i18n.Messages] ?? 'Unknown'}
						</DropdownMenuLabel>
						{tags.filter(t => t!.category === category).filter(Boolean).map(tag => {
							return <DropdownMenuCheckboxItem
								key={tag.name}
								checked={filters[tag!.id]}
								onSelect={(e) => e.preventDefault()}
								onCheckedChange={() => toggleFilter(tag.id)}
							>
								{i18n.Messages[tag.name as keyof typeof i18n.Messages] ?? 'Unknown'}
							</DropdownMenuCheckboxItem>;
						})}
						{index !== (tagCategories.length - 1) && <DropdownMenuSeparator />}
					</div>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<Input
				className='flex-grow'
				placeholder={i18n.Messages.SEARCH_MENU}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</div>
		{list.length ? categories.map((category, index) => {
			const items = list.filter(i => i.category === category);
			if (!items.length) return null;

			return <div key={category} className={cn('flex flex-col gap-5', index !== 0 && 'mt-10')}>
				<h3 className='scroll-m-20 font-semibold text-2xl tracking-tight'>
					{i18n.Messages[category as keyof typeof i18n.Messages]}
				</h3>
				<div className='gap-5 grid grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] overflow-hidden'>
					{items.map(item =>
						<Card key={item.name} className='w-auto h-auto'>
							<CardHeader className='pb-2'>
								<Link to={item.image}>
									<img
										loading='eager'
										decoding='async'
										alt={i18n.Messages[item.name as keyof typeof i18n.Messages] ?? 'Unknown'}
										className='bg-secondary mb-2 rounded-lg max-w-auto h-[225px] md:h-[275px] object-cover'
										src={item.image}
									/>
								</Link>
								<div className='flex gap-2'>
									<h3 className='scroll-m-20 font-semibold text-2xl tracking-tight'>
										{i18n.Messages[item.name as keyof typeof i18n.Messages] ?? 'Unknown'}
									</h3>
								</div>
							</CardHeader>
							{item.description && <CardContent className='flex-1'>
								<p className='break-words leading-7'>
									{i18n.Messages[item.description as keyof typeof i18n.Messages] ?? 'Unknown'}
								</p>
							</CardContent>}
							<CardFooter className='flex justify-between items-center'>
								{item.tags.length ? <div className='flex items-center gap-2 overflow-x-auto no-scrollbar'>
									{item.tags.map(name => {
										const tag = getTagByName(name);
										if (!tag) return null;

										const text = i18n.Messages[tag.name as keyof typeof i18n.Messages] ?? 'Unknown';

										return <Badge
											role='button'
											aria-label={i18n.Messages.TOGGLE_FILTER.format({ name: text }) as string}
											key={tag.name + item.name}
											className={cn('select-none break-normal whitespace-nowrap cursor-pointer', filters[tag.id] && 'bg-primary/70')}
											onClick={() => toggleFilter(tag.id)}
										>
											{text}
										</Badge>;
									}).filter(Boolean)}
								</div> : ''}
								<p className='float-left ml-2 text-xl break-all leading-7 whitespace-nowrap'>
									{currency.format(item.price)}
								</p>
							</CardFooter>
						</Card>
					)}
				</div>
			</div>;
		}) : <EmptyState icon={<SearchX size={250} strokeWidth={1} />} message={i18n.Messages.NOT_FOUND} />}
		<div className='mb-10' />
	</Page >;
}

function getTagByName(name: string) {
	return Tags.find(tag => tag.name === name);
}