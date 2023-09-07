import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/accordion';
import { Page } from '~/components/layouts';
import i18n from 'i18n';

export const path = '/faq';
export const element = FAQ;

function FAQ() {
	return <Page
		section={i18n.Messages.FAQ}
		before={<div className='w-full bg-secondary h-52 flex justify-center items-center'>
			<h2 className='scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0'>
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
		</Accordion>
	</Page>;
}