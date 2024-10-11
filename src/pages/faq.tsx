import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/accordion';
import Information from '~/config/info.json';
import { Page } from '~/components/layouts';
import { useLocalization } from '~/hooks';
import { Check, X } from 'lucide-react';

export const path = '/faq';
export const element = FAQ;

function FAQ() {
	const { Messages } = useLocalization();

	return <Page section={Messages.FAQ}>
		<h2 className='scroll-m-20 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{Messages.OUR_FOOD}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='halal'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_HALAL_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_HALAL_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='gluten-free'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_GLUTEN_FREE_TITLE.format({ name: Information.Name })}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_GLUTEN_FREE_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='vegeterian'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_VEGETARIAN_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_VEGETARIAN_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='vegan'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_VEGAN_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_VEGAN_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='scroll-m-20 mt-10 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{Messages.PAYMENT}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='apple-or-google-pay'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_APPLE_OR_GOOGLE_PAY_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_APPLE_OR_GOOGLE_PAY_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='payment-failed'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_PAYMENT_FAILED_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_PAYMENT_FAILED_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='payment-methods'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_PAYMENT_METHODS_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_PAYMENT_METHODS_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='scroll-m-20 mt-10 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{Messages.VISITING_US}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='book-table'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_BOOK_TABLE_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_BOOK_TABLE_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='opening-hours'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_OPENING_HOURS_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					<div className='flex flex-col gap-2'>
						{Object.entries(Information.OpeningTimes).map(([day, times]) => <div key={day} className='flex items-center gap-2'>
							{times.start ? <Check aria-label={Messages.CLOSED} /> : <X aria-label={Messages.OPEN} />} {Messages[day.toUpperCase() as keyof typeof Messages]} {times.start && `(${times.start} - ${times.end})`}
						</div>)}
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<h2 className='scroll-m-20 mt-10 first:mt-0 pb-2 font-semibold text-3xl tracking-tight transition-colors'>
			{Messages.DELIVERY_OR_COLLECTION}
		</h2>
		<Accordion type='single' collapsible className='w-full'>
			<AccordionItem value='place-order'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_PLACE_ORDER_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_PLACE_ORDER_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='delivery-location'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_DELIVERY_LOCATION_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_DELIVERY_LOCATION_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='free-delivery'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_FREE_DELIVERY_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_FREE_DELIVERY_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value='takeaway'>
				<AccordionTrigger className='font-semibold'>
					{Messages.FAQ_TAKEAWAY_TITLE}
				</AccordionTrigger>
				<AccordionContent>
					{Messages.FAQ_TAKEAWAY_DESCRIPTION}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
		<div className='mb-10' />
	</Page>;
}