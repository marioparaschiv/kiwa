import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/form';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Hammer } from 'lucide-react';
import EmptyState from '~/components/empty-state';
import Calendar from '~/components/calendar';
import { Page } from '~/components/layouts';
import { useForm } from 'react-hook-form';
import Button from '~/components/button';
import i18n, { useLocale } from 'i18n';
import { cn } from '~/utils';
import * as z from 'zod';

export const path = '/reservation';
export const element = Reservation;

const FormSchema = z.object({
	date: z.date(),
	time: z.number().min(1).max(6)
});

function Reservation() {
	const { locale } = useLocale();

	const formatter = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', weekday: 'long' });
	const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) });

	return <Page section={i18n.Messages.RESERVE}>
		{import.meta.env.DEV && <EmptyState icon={<Hammer size={250} />} message={i18n.Messages.WORK_IN_PROGRESS} />
		}
		{!import.meta.env.DEV && <Form {...form}>
			<form onSubmit={form.handleSubmit(console.log)} className='space-y-8'>
				<FormField
					control={form.control}
					name='date'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>{i18n.Messages.DATE}</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button variant='outline' className={cn('w-[300px] justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
											<CalendarIcon className='mr-2 h-4 w-4' />
											<span className='select-none'>
												{field.value ? formatter.format(field.value) : i18n.Messages.PICK_RESERVATION_DATE}
											</span>
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className='w-auto p-0' align='start'>
									<Calendar
										mode='single'
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date.toDateString() !== new Date().toDateString() && date < new Date() || date < new Date('1900-01-01')}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='time'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>{i18n.Messages.TIME}</FormLabel>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='time'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>{i18n.Messages.DATE}</FormLabel>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>
					{i18n.Messages.SUBMIT}
				</Button>
			</form>
		</Form>}
	</Page>;
}