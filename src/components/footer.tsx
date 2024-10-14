import { Google, Instagram, TripAdvisor, Facebook, Deliveroo, UberEats } from '~/components/icons';
import { Check, Mail, MapPin, Phone, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Information from '~/config/info.json';
import Links from '~/config/links.json';
import { cn } from '~/utils';


function Footer(props: React.HTMLProps<HTMLElement>) {
	const { t } = useTranslation();

	return <footer {...props} className={cn('mt-auto text-sm w-full h-full p-0 border-t px-8 py-8 md:p-10 md:text-base bg-background', props.className)}>
		<div className='container w-full grid grid-cols-footer items-start justify-center md:justify-evenly gap-8 md:flex md:flex-row p-0'>
			<div className='flex flex-col gap-5' >
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					{t('OPENING_TIMES')}
				</h3>
				<div className='flex flex-col gap-2'>
					{Object.entries(Information.OpeningTimes).map(([day, times]) => <div key={day} className='flex gap-2 items-center'>
						{times.start ? <Check /> : <X />} {t(day.toUpperCase())} {times.start && `(${times.start} - ${times.end})`}
					</div>)}
				</div>
			</div >
			<div className='flex flex-col gap-5'>
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					{t('FIND_US_ON')}
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
			<div className='flex flex-col gap-5'>
				<h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
					{t('CONTACT_DETAILS')}
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
		</div >
	</footer >;
}

export default Footer;