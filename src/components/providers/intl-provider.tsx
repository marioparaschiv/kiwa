import { createContext, useContext, useEffect, useState } from 'react';
import IntlMessageFormat from 'intl-messageformat';
import { DEFAULT_LANGUAGE } from '~/constants';
import Locales from '~/i18n';

type IntlProviderProps = {
	children: React.ReactNode;
	defaultLocale?: string;
	storageKey?: string;
};

type IntlProviderState = {
	locale: string;
	setLocale: (locale: string) => void;
};

const initial = {
	locale: DEFAULT_LANGUAGE,
	setLocale: () => null
};

const MISC_REGEX = /[~*_]{2}.+?[~*_]{2}|\[.*?\]\(.+?\)|\n\n/;
const PARAMETERS_REGEX = /\{.+?\}/;

const IntlProviderContext = createContext<IntlProviderState>(initial);

function IntlProvider({ children, defaultLocale = DEFAULT_LANGUAGE, storageKey = 'locale', ...props }: IntlProviderProps) {
	const persisted = localStorage.getItem(storageKey) || (navigator as any).locale;
	const [locale, setLocale] = useState(() => persisted && Locales[persisted as keyof typeof Locales] ? persisted : defaultLocale);

	function updateLocale() {
		const root = window.document.documentElement;
		root.setAttribute('data-locale', locale);

		const parsed: Record<keyof typeof Locales[keyof typeof Locales], string | InstanceType<typeof IntlMessageFormat>> = { ...IntlProvider.defaultMessages, ...Locales[locale as keyof typeof Locales] };

		for (const key in parsed) {
			const value = parsed[key as keyof typeof parsed];
			const message = parseMessage(value as string, locale);

			parsed[key as keyof typeof parsed] = message;
		}

		IntlProvider.Messages = Object.assign(parsed);
	};

	useEffect(() => {
		updateLocale();
	}, [locale]);

	updateLocale();

	const ctx = {
		locale,
		setLocale: (locale: string) => {
			localStorage.setItem(storageKey, locale);
			setLocale(locale);
		},
	};

	return (
		<IntlProviderContext.Provider key={locale} {...props} value={ctx}>
			{children}
		</IntlProviderContext.Provider>
	);
}

IntlProvider.defaultMessages = Locales[DEFAULT_LANGUAGE as keyof typeof Locales];
IntlProvider.Messages = {} as Record<keyof typeof Locales[keyof typeof Locales], string & InstanceType<typeof IntlMessageFormat>>;

function parseMessage(message: string, locale: string): string | InstanceType<typeof IntlMessageFormat> {
	const parameters = PARAMETERS_REGEX.test(message);
	const misc = MISC_REGEX.test(message);

	return parameters || misc ? new IntlMessageFormat(message, locale) : message;
}

export function useLocale() {
	const context = useContext(IntlProviderContext);

	if (context === undefined) {
		throw new Error('useLocale must be used within an IntlProvider');
	}

	return context;
};

export default IntlProvider;