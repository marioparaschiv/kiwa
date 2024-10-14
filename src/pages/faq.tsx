import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/accordion';
import { useTranslation } from 'react-i18next';
import Information from '~/config/info.json';
import { Page } from '~/components/layouts';
import { Check, X } from 'lucide-react';


export const path = '/faq';
export const element = FAQ;

function FAQ() {
	const { t } = useTranslation();

	return <Page section={t('FAQ')}>
		<h2 className='scroll-m-20 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{t('OUR_FOOD')}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='halal'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_HALAL_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_HALAL_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='gluten-free'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_GLUTEN_FREE_TITLE', { name: Information.Name })}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_GLUTEN_FREE_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='vegeterian'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_VEGETARIAN_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_VEGETARIAN_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='vegan'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_VEGAN_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_VEGAN_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='scroll-m-20 mt-10 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{t('PAYMENT')}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='apple-or-google-pay'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_APPLE_OR_GOOGLE_PAY_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_APPLE_OR_GOOGLE_PAY_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='payment-failed'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_PAYMENT_FAILED_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_PAYMENT_FAILED_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='payment-methods'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_PAYMENT_METHODS_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_PAYMENT_METHODS_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='scroll-m-20 mt-10 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{t('VISITING_US')}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='book-table'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_BOOK_TABLE_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_BOOK_TABLE_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='opening-hours'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_OPENING_HOURS_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					<div className='flex flex-col gap-2'>
						{Object.entries(Information.OpeningTimes).map(([day, times]) => <div key={day} className='flex items-center gap-2'>
							{times.start ? <Check aria-label={t('CLOSED')} /> : <X aria-label={t('OPEN')} />} {t(day.toUpperCase())} {times.start && `(${times.start} - ${times.end})`}
						</div>)}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='scroll-m-20 mt-10 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{t('DELIVERY_OR_COLLECTION')}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='place-order'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_PLACE_ORDER_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_PLACE_ORDER_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='delivery-location'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_DELIVERY_LOCATION_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_DELIVERY_LOCATION_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='free-delivery'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_FREE_DELIVERY_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_FREE_DELIVERY_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='takeaway'>
				<AccordionTrigger className='font-semibold'>
					{t('FAQ_TAKEAWAY_TITLE')}
				</AccordionTrigger>
				<AccordionContent>
					{t('FAQ_TAKEAWAY_DESCRIPTION')}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<div className='mb-10' />
	</Page>;
}