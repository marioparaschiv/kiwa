export * as Reservation from './reserve';
export * as Home from './home';
export * as Menu from './menu';
export * as FAQ from './faq';

export type Page = {
	path: string,
	element: React.ComponentType;
};