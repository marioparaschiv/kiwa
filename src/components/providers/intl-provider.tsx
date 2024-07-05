import { createContext, useEffect, useState } from 'react';
import { DefaultLanguage } from '~/config/info.json';
import IntlMessageFormat from 'intl-messageformat';
import Locales from '~/../i18n';
import moment from 'moment';
import { z } from 'zod';

type IntlProviderProps = {
	children: React.ReactNode;
	defaultLocale?: string;
	storageKey?: string;
};

type IntlProviderState = {
	locale: string;
	initialized: boolean;
	setLocale: (locale: string) => void;
};

const initial = {
	locale: DefaultLanguage,
	initialized: false,
	setLocale: () => null
};

const PARAMETERS_REGEX = /\{.+?\}/;

export const IntlProviderContext = createContext<IntlProviderState>(initial);

function IntlProvider({ children, defaultLocale = DefaultLanguage, storageKey = 'locale', ...props }: IntlProviderProps) {
	const persisted = localStorage.getItem(storageKey) || (navigator as any).locale;
	const [locale, setLocale] = useState(() => persisted && Locales[persisted as keyof typeof Locales] ? persisted : defaultLocale);
	const [initialized, setInitialized] = useState(false);

	function updateLocale(locale: string) {
		console.log('updating locale');
		const root = window.document.documentElement;
		root.setAttribute('data-locale', locale);

		type Keys = keyof typeof IntlProvider.defaultMessages | keyof typeof Locales[keyof typeof Locales];
		type Values = string | InstanceType<typeof IntlMessageFormat>;

		const parsed: Record<Keys, Values> = { ...IntlProvider.defaultMessages, ...Locales[locale as keyof typeof Locales] };

		for (const key in parsed) {
			const value = parsed[key as keyof typeof parsed];
			const message = parseMessage(value as string, locale);

			parsed[key as keyof typeof parsed] = message;
		}

		IntlProvider.Messages = Object.assign(parsed);
	};

	if (!initialized) {
		updateLocale(locale);
		setInitialized(true);
	}

	const ctx = {
		locale,
		initialized,
		setLocale: (locale: string) => {
			localStorage.setItem(storageKey, locale);
			updateLocale(locale);
			setLocale(locale);
		},
	};

	useEffect(() => {
		z.setErrorMap((issue, ctx) => {
			if (issue.code === z.ZodIssueCode.invalid_type) {
				if (issue.received === 'undefined') {
					return { message: IntlProvider.Messages.ERROR_REQUIRED };
				}

				return { message: IntlProvider.Messages.ERROR_INVALID_TYPE.format({ expected: issue.expected }) as string };
			}

			if (issue.code === z.ZodIssueCode.invalid_string && issue.validation === 'email') {
				return { message: IntlProvider.Messages.ERROR_INVALID_EMAIL as string };
			}

			return { message: ctx.defaultError };
		});

		moment.locale(locale);
	}, []);

	return (
		<IntlProviderContext.Provider key={locale} {...props} value={ctx}>
			{children}
		</IntlProviderContext.Provider>
	);
}

IntlProvider.defaultMessages = Locales[DefaultLanguage as keyof typeof Locales] as Record<keyof typeof Locales[keyof typeof Locales], string | InstanceType<typeof IntlMessageFormat>>;
IntlProvider.Messages = {} as Record<keyof typeof IntlProvider.defaultMessages | keyof typeof Locales[keyof typeof Locales], string & InstanceType<typeof IntlMessageFormat>>;

function parseMessage(message: string, locale: string): string | InstanceType<typeof IntlMessageFormat> {
	return PARAMETERS_REGEX.test(message) ? new IntlMessageFormat(message, locale) : message;
}

export default IntlProvider;