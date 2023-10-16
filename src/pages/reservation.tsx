import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/form';
import { CalendarCheck, CalendarIcon, Check, Clock, Contact, PersonStanding } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/popover';
import { zodResolver } from '@hookform/resolvers/zod';
import Textarea from '~/components/textarea';
import moment, { type Moment } from 'moment';
import Calendar from '~/components/calendar';
import { Page } from '~/components/layouts';
import { useForm } from 'react-hook-form';
import Button from '~/components/button';
import useToast from '~/hooks/use-toast';
import { cn, intervals } from '~/utils';
import i18n, { useLocale } from 'i18n';
import Input from '~/components/input';
import { useMemo } from 'react';
import * as z from 'zod';

import Information from '~/config/info.json';

export const path = '/reservation';
export const element = Reservation;

const FormSchema = z.object({
	date: z.date(),
	time: z.string(),
	people: z.number().min(Information.Bookings.People.min).max(Information.Bookings.People.max),
	message: z.string().optional(),
	name: z.string(),
	email: z.string().email(),
	phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
		get message() {
			return i18n.Messages.INVALID_PHONE_NUMBER;
		}
	})
});

function Reservation() {
	const { locale } = useLocale();

	const { toast } = useToast();
	const formatter = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', weekday: 'long' });
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			people: Information.Bookings.People.min
		}
	});

	return <Page section={i18n.Messages.RESERVE}>
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit((data) => {
					console.log(data);
					form.reset();

					toast({
						title: <div className='flex gap-2 items-center'>
							<Check />
							{i18n.Messages.RESERVATION_REQUEST_SENT_TITLE}
						</div>,
						description: i18n.Messages.RESERVATION_REQUEST_SENT_DESCRIPTION,
					});
				})}
			>
				<div className='flex items-center gap-4 mb-6'>
					<CalendarCheck />
					<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						{i18n.Messages.BOOKING_DETAILS}
					</h3>
				</div>
				<div className='flex flex-col items-start gap-5 w-full flex-wrap'>
					<FormField
						control={form.control}
						name='date'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full'>
								<FormLabel>{i18n.Messages.DATE} *</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button variant='outline' className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
												<CalendarIcon className='mr-2 h-4 w-4' />
												<span className='select-none'>
													{field.value ? formatter.format(field.value) : i18n.Messages.PICK_RESERVATION_DATE}
												</span>
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className='w-auto p-0' align='start'>
										<Calendar
											initialFocus
											mode='single'
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) => {
												if (date.toDateString() !== new Date().toDateString() && date < new Date()) {
													return true;
												}

												if (date < new Date('1900-01-01')) {
													return true;
												}

												if (!Information.OpeningTimes[moment(date).format('dddd') as keyof typeof Information.OpeningTimes]) {
													return true;
												}

												return false;
											}}
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
						render={({ field }) => {
							const times = useMemo(() => {
								const date = form.getValues('date');
								const day = date?.getDay?.();

								switch (day) {
									case 1:
										return Information.OpeningTimes.Monday;
									case 2:
										return Information.OpeningTimes.Tuesday;
									case 3:
										return Information.OpeningTimes.Wednesday;
									case 4:
										return Information.OpeningTimes.Thursday;
									case 5:
										return Information.OpeningTimes.Friday;
									case 6:
										return Information.OpeningTimes.Saturday;
									case 7:
										return Information.OpeningTimes.Sunday;
								}
							}, [form.watch('date')]) as { start: string, end: string; };

							const start = times && moment(times.start, ['hh', 'mm']);
							const end = times && moment(times.end, ['hh', 'mm']);
							const available = times && intervals(start as Moment, end as Moment);

							return (
								<FormItem className='flex flex-col w-full '>
									<FormLabel>{i18n.Messages.TIME} *</FormLabel>
									<Select onValueChange={field.onChange} value={field.value} disabled={!times}>
										<FormControl>
											<SelectTrigger className='w-full  px-4'>
												<div className='flex items-center gap-2'>
													<Clock className='h-4 w-4' />
													<SelectValue
														className='select-none'
														placeholder={<span className={cn('text-foreground', !field.value && 'text-muted-foreground')}>
															{i18n.Messages.PICK_TIME}
														</span>}
													/>
												</div>
											</SelectTrigger>
										</FormControl>
										<SelectContent className='max-h-96'>
											{available?.map?.(a => <SelectItem className='select-none' key={a.format('HH:mm')} value={a.format('HH:mm')}>
												{a.format('HH:mm')}
											</SelectItem>)}

										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name='people'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full '>
								<FormLabel>{i18n.Messages.PEOPLE}</FormLabel>
								<FormControl>
									<Select
										disabled={field.disabled}
										onValueChange={v => field.onChange(Number(v))}
										value={field.value?.toString()}
									>
										<SelectTrigger className='w-full  px-4'>
											<div className='flex items-center gap-2'>
												<PersonStanding className='h-4 w-4' />
												<SelectValue
													className='select-none'
													placeholder={<span className={cn('text-foreground', !field.value && 'text-muted-foreground')}>
														{i18n.Messages.PEOPLE}
													</span>}
												/>
											</div>
										</SelectTrigger>
										<SelectContent>
											{Array.from({ length: Information.Bookings.People.max }).map((_, i) => {
												const people = i + 1;

												return <SelectItem key={people} value={String(people)}>
													{people}
												</SelectItem>;
											}).slice(Information.Bookings.People.min - 1)}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex items-center gap-4 my-6'>
					<Contact />
					<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						{i18n.Messages.CONTACT_DETAILS}
					</h3>
				</div>
				<div className='flex flex-col items-start gap-5 w-full mb-4 flex-wrap'>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full '>
								<FormLabel>{i18n.Messages.NAME} *</FormLabel>
								<FormControl>
									<Input className='w-full' placeholder={i18n.Messages.RESERVATION_PLACEHOLDER_NAME} {...field} value={field.value ?? ''} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full '>
								<FormLabel>{i18n.Messages.EMAIL} *</FormLabel>
								<FormControl>
									<Input className='w-full' placeholder={i18n.Messages.RESERVATION_PLACEHOLDER_EMAIL} {...field} value={field.value ?? ''} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full '>
								<FormLabel>{i18n.Messages.PHONE_NUMBER} *</FormLabel>
								<FormControl>
									<Input className='w-full' placeholder={i18n.Messages.RESERVATION_PLACEHOLDER_PHONE_NUMBER} {...field} value={field.value ?? ''} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex flex-col items-start gap-5 w-full mb-6 flex-wrap'>
					<FormField
						control={form.control}
						name='message'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full'>
								<FormLabel>{i18n.Messages.MESSAGE}</FormLabel>
								<FormControl>
									<Textarea className='w-full' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='w-full ' type='submit'>
					{i18n.Messages.REQUEST_RESERVATION}
				</Button>
			</form>
		</Form>
	</Page>;
};