import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/accordion';
import { useTheme } from '~/components/providers/theme-provider';
import { Page } from '~/components/layouts';
import i18n from 'i18n';

export const path = '/faq';
export const element = FAQ;

function FAQ() {
	const { theme } = useTheme();

	return <Page
		section={i18n.Messages.FAQ}
		before={<div className={`w-full bg-secondary h-52 flex justify-center items-center ${theme === 'dark' ? 'bg-hero-pattern-dark' : 'bg-hero-pattern-light'} bg-cover bg-scroll bg-center bg-no-repeat`}>
			<h2 className='scroll-m-20 pb-2 text-5xl font-bold tracking-tight transition-colors first:mt-0'>
				{i18n.Messages.FAQ}
			</h2>
		</div>}
	>
		<h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
			{i18n.Messages.OUR_FOOD}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='halal'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_HALAL_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_HALAL_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='gluten-free'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_GLUTEN_FREE_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_GLUTEN_FREE_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='vegeterian'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_VEGETARIAN_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_VEGETARIAN_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='vegan'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_VEGAN_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_VEGAN_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
			{i18n.Messages.PAYMENT}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='apple-or-google-pay'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_APPLE_OR_GOOGLE_PAY_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_APPLE_OR_GOOGLE_PAY_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='payment-failed'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_PAYMENT_FAILED_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_PAYMENT_FAILED_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='payment-methods'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_PAYMENT_METHODS_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_PAYMENT_METHODS_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
			{i18n.Messages.VISITING_US}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='book-table'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_BOOK_TABLE_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_BOOK_TABLE_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='opening-hours'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_OPENING_HOURS_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_OPENING_HOURS_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
			{i18n.Messages.DELIVERY_OR_COLLECTION}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='place-order'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_PLACE_ORDER_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_PLACE_ORDER_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='delivery-location'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_DELIVERY_LOCATION_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_DELIVERY_LOCATION_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='free-delivery'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_FREE_DELIVERY_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_FREE_DELIVERY_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='takeaway'>
				<AccordionTrigger className='font-bold'>{i18n.Messages.FAQ_TAKEAWAY_TITLE}</AccordionTrigger>
				<AccordionContent>
					{i18n.Messages.FAQ_TAKEAWAY_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<div className='mb-10' />
	</Page>;
}