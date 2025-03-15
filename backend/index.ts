import { verify } from 'hcaptcha';
import parser from 'body-parser';
import { Resend } from 'resend';
import express from 'express';
import cors from 'cors';
import { z } from 'zod';

import Information from '../config/info.json';


const CAPTCHA_SITEKEY = 'efdc477c-a1a6-420e-9bcc-f52a8d62320a';


if (!process.env.RESEND_API_KEY) {
	console.error('FATAL: RESEND_API_KEY is not present in the current environment.');
	process.exit(-1);
}

if (!process.env.HCAPTCHA_SECRET) {
	console.error('FATAL: HCAPTCHA_SECRET is not present in the current environment.');
	process.exit(-1);
}

const Reservation = z.object({
	date: z.string(),
	time: z.string(),
	people: z.number().min(Information.Bookings.People.min).max(Information.Bookings.People.max),
	message: z.string().optional(),
	name: z.string(),
	email: z.string().email(),
	phone: z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/),
	captcha: z.string()
});

type ReservationData = z.infer<typeof Reservation>;


const resend = new Resend(process.env.RESEND_API_KEY);
const server = express();

server.use(cors());
server.use(parser.json());

server.post('/captcha', (req, res, next) => {
	res.status(401).json({});
});

server.post('/submit-reservation', async (req, res, next) => {
	try {
		let parsed: ReservationData | undefined;

		try {
			parsed = Reservation.parse(req.body);
		} catch (error) {
			console.log(error);
			res.status(400).json({ success: false, code: 'RESERVATION_INVALID_REQUEST' });
		}

		if (!parsed) return;

		const response = await verify(process.env.HCAPTCHA_SECRET!, parsed.captcha, req.ip, CAPTCHA_SITEKEY);

		if (!response.success) {
			res.json({ success: false, code: 'RESERVATION_INVALID_CAPTCHA' });
			return;
		}

		const email = await resend.emails.send({
			from: 'Kiwa <kiwa@mail.marioparaschiv.com>',
			to: [Information.Email, parsed.email],
			subject: 'hello world',
			html: '<p>it works!</p>'
		});

		if (email.error) throw new Error(email.error.message);

		res.json({ success: true });
	} catch (error) {
		console.error('[ERROR] Faced issue with request:', error);
		res.status(400).json({ success: false, code: 'RESERVATION_INVALID_REQUEST' });
	}
});

const listener = server.listen(process.env.PORT ?? 3000, () => {
	const address = listener.address();

	console.log(`Listening on port ${typeof address == 'string' ? address : address?.port}.`);
});