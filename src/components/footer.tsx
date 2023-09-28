import { Google, Instagram, TripAdvisor, Facebook, Deliveroo, UberEats } from '~/components/icons';
import { Check, Mail, MapPin, Phone, X } from 'lucide-react';
import Information from '~/config/info.json';
import Links from '~/config/links.json';
import { cn } from '~/utils';
import i18n from 'i18n';

function Footer(props: React.HTMLProps<HTMLElement>) {
	return <footer {...props} className={cn('mt-auto w-full h-full p-5 py-16 border-t', props.className)}>
		<div className='container flex flex-col items-start justify-center md:justify-between gap-8 md:flex-row'>
			<div className='flex flex-col gap-5'>
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					{i18n.Messages.CONTACT_DETAILS}
				</h3>
				<div className='flex gap-3 items-center'>
					<MapPin />
					<a target='_blank' href={Links.Google} className='hover:underline whitespace-pre'>
						{Array.isArray(Information.Address) ? Information.Address.join('\n') : Information.Address}
					</a>
				</div>
				<div className='flex gap-3 items-center'>
					<Phone />
					<a target='_blank' href={`tel:${Information.Telephone.replaceAll(' ', '')}`} className='hover:underline'>
						{Information.Telephone}
					</a>
				</div>
				<div className='flex gap-3 items-center'>
					<Mail />
					<a target='_blank' href={`mailto:${Information.Email}`} className='hover:underline'>
						{Information.Email}
					</a>
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					{i18n.Messages.OPENING_TIMES}
				</h3>
				<div className='flex flex-col gap-2'>
					{Object.entries(Information.OpeningTimes).map(([day, times]) => <div key={day} className='flex gap-2 items-center'>
						{times ? <Check /> : <X />} {i18n.Messages[day.toUpperCase() as keyof typeof i18n.Messages]} {times}
					</div>)}
				</div>
			</div>
			<div className='flex flex-col gap-5'>
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					{i18n.Messages.FIND_US_ON}
				</h3>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-3 items-center'>
						<UberEats />
						<a target='_blank' href={Links.UberEats} className='hover:underline'>
							Uber Eats
						</a>
					</div>
					<div className='flex gap-3 items-center'>
						<Deliveroo />
						<a target='_blank' href={Links.Deliveroo} className='hover:underline'>
							Deliveroo
						</a>
					</div>
					<div className='flex gap-3 items-center'>
						<Instagram />
						<a target='_blank' href={Links.Instagram} className='hover:underline'>
							Instagram
						</a>
					</div>
					<div className='flex gap-3 items-center'>
						<Google />
						<a target='_blank' href={Links.Google} className='hover:underline'>
							Google
						</a>
					</div>
					<div className='flex gap-3 items-center'>
						<TripAdvisor />
						<a target='_blank' href={Links.TripAdvisor} className='hover:underline'>
							Trip Advisor
						</a>
					</div>
					<div className='flex gap-3 items-center'>
						<Facebook />
						<a target='_blank' href={Links.Facebook} className='hover:underline'>
							Facebook
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>;
}

export default Footer;