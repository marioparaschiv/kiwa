import LanguageDetector from 'i18next-browser-languagedetector';
import i18n, { type InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import { zodI18nMap } from 'zod-i18n-map';
import { z } from 'zod';


i18n.use(LanguageDetector);
i18n.use(Backend);

i18n.init({
	fallbackLng: 'fr',
	supportedLngs: ['en', 'fr'],
	debug: true,
	load: 'currentOnly',

	interpolation: {
		escapeValue: false,
	},

	ns: ['translation', 'zod', 'menu'],

	react: {
		bindI18n: 'languageChanged loaded',
		bindStore: 'added removed',
		nsMode: 'default',
	}
} as InitOptions);

z.setErrorMap(zodI18nMap);

export default i18n;