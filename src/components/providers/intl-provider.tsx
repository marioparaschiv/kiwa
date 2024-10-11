import { createContext, useEffect, useState } from 'react';
import { DefaultLanguage } from '~/config/info.json';
import IntlMessageFormat from 'intl-messageformat';
import Locales from '~/../i18n';
import moment from 'moment';
import { z } from 'zod';

const defaultMessages = Locales[DefaultLanguage as keyof typeof Locales] as Record<keyof typeof Locales[keyof typeof Locales], string | InstanceType<typeof IntlMessageFormat>>;

type IntlProviderProps = {
	children: React.ReactNode;
	defaultLocale?: string;
	storageKey?: string;
};

type IntlProviderState = {
	locale: string;
	initialized: boolean;
	Messages: Record<keyof typeof defaultMessages | keyof typeof Locales[keyof typeof Locales], string & InstanceType<typeof IntlMessageFormat>>,
	setLocale: (locale: string) => void;
};

const initial = {
	locale: DefaultLanguage,
	initialized: false,
	Messages: {} as Record<keyof typeof defaultMessages | keyof typeof Locales[keyof typeof Locales], string & InstanceType<typeof IntlMessageFormat>>,
	setLocale: () => null
};

const PARAMETERS_REGEX = /\{.+?\}/;
const IntlProviderContext = createContext<IntlProviderState>(initial);

function IntlProvider({ children, defaultLocale = DefaultLanguage, storageKey = 'locale', ...props }: IntlProviderProps) {
	const [messages, setMessages] = useState<Record<keyof typeof defaultMessages | keyof typeof Locales[keyof typeof Locales], string & InstanceType<typeof IntlMessageFormat>> | Record<any, any>>({});
	const persisted = localStorage.getItem(storageKey) || (navigator as any).locale;
	const [locale, setLocale] = useState(() => persisted && Locales[persisted as keyof typeof Locales] ? persisted : defaultLocale);
	const [initialized, setInitialized] = useState(false);

	function updateLocale(locale: string) {
		console.log('updating locale');
		const root = window.document.documentElement;
		root.setAttribute('data-locale', locale);

		type Keys = keyof typeof defaultMessages | keyof typeof Locales[keyof typeof Locales];
		type Values = string | InstanceType<typeof IntlMessageFormat>;

		const parsed: Record<Keys, Values> = { ...defaultMessages, ...Locales[locale as keyof typeof Locales] };

		for (const key in parsed) {
			const value = parsed[key as keyof typeof parsed];
			const message = parseMessage(value as string, locale);

			parsed[key as keyof typeof parsed] = message;
		}

		setMessages(Object.assign(parsed));
	};

	if (!initialized) {
		updateLocale(locale);
		setInitialized(true);
	}

	const ctx = {
		locale,
		initialized,
		Messages: messages,
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
					return { message: messages.ERROR_REQUIRED };
				}

				return { message: messages.ERROR_INVALID_TYPE.format({ expected: issue.expected }) as string };
			}

			if (issue.code === z.ZodIssueCode.invalid_string && issue.validation === 'email') {
				return { message: messages.ERROR_INVALID_EMAIL as string };
			}

			return { message: ctx.defaultError };
		});

		moment.locale(locale);
	}, [locale]);

	return (
		<IntlProviderContext.Provider key={locale} {...props} value={ctx}>
			{children}
		</IntlProviderContext.Provider>
	);
}

IntlProvider.Context = IntlProviderContext;

function parseMessage(message: string, locale: string): string | InstanceType<typeof IntlMessageFormat> {
	return PARAMETERS_REGEX.test(message) ? new IntlMessageFormat(message, locale) : message;
}

export default IntlProvider;