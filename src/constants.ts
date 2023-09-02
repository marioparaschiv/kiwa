export const Information = {
	Email: 'kiwa.aix@gmail.com',
	Telephone: '04 42 26 31 93',
	OpeningTimes: {
		Monday: '(12:00 - 22:15)',
		Tuesday: false,
		Wednesday: '(12:00 - 22:15)',
		Thursday: '(12:00 - 22:15)',
		Friday: '(12:00 - 22:15)',
		Saturday: '(12:00 - 22:15)',
		Sunday: '(12:00 - 22:15)'
	},
	Address: [
		'8 Rue Paul Bert',
		'13100 Aix-En-Provence'
	].join('\n')
} as const;

export const Links = {
	Instagram: 'https://instagram.com/kiwa_sushi',
	Facebook: 'https://facebook.com/restaurantkiwasushi',
	Google: 'https://goo.gl/maps/y2nNmt8a83vDCy6p9',
	TripAdvisor: 'https://www.tripadvisor.fr/Restaurant_Review-g187209-d3594629-Reviews-Kiwa_Sushi-Aix_en_Provence_Bouches_du_Rhone_Provence_Alpes_Cote_d_Azur.html',
	UberEats: 'https://ubereats.app.link/RY2J7d0CeCb',
	Deliveroo: 'https://deliveroo.fr/menu/aix-en-provence/aix-centre-ville/kiwa-aix'
} as const;

export const DEFAULT_LANGUAGE = 'fr-fr' as const;