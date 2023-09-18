import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/form';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover';
import { useTheme } from '~/components/providers/theme-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import Calendar from '~/components/calendar';
import { Page } from '~/components/layouts';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Button from '~/components/button';
import i18n, { useLocale } from 'i18n';
import { cn } from '~/utils';
import * as z from 'zod';

export const path = '/reservation';
export const element = Reservation;

const FormSchema = z.object({
	date: z.date(),
	select: z.number().min(1).max(6)
});


function Reservation() {
	const { theme } = useTheme();
	const { locale } = useLocale();

	const formatter = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', weekday: 'long' });
	const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) });

	return <Page
		section={i18n.Messages.RESERVE}
		before={<div className={`w-full bg-secondary h-52 flex justify-center items-center ${theme === 'dark' ? 'bg-hero-pattern-dark' : 'bg-hero-pattern-light'} bg-cover bg-scroll bg-center bg-no-repeat`}>
			<h2 className='scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0'>
				{i18n.Messages.RESERVE}
			</h2>
		</div>}
	>
		<Form {...form}>
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
										<Button
											variant={'outline'}
											className={cn('w-[300px] justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
										>
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
					name='select'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>{i18n.Messages.DATE}</FormLabel>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>
					Submit
				</Button>
			</form>
		</Form>
	</Page>;
}