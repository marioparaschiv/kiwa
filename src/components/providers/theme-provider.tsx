import { createContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: string;
	storageKey?: string;
};

type ThemeProviderState = {
	rawTheme: string;
	theme: string;
	systemTheme: string;
	setTheme: (theme: 'light' | 'dark' | 'system') => void;
};

const initial = {
	rawTheme: 'system',
	systemTheme: 'dark',
	theme: 'dark',
	setTheme: () => null,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initial);

export default function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'theme', ...props }: ThemeProviderProps) {
	const system = window.matchMedia('(prefers-color-scheme: dark)');

	const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
	const [systemTheme, setSystemTheme] = useState(() => system.matches ? 'dark' : 'light');

	system.onchange = (event) => setSystemTheme(event.matches ? 'dark' : 'light');

	useEffect(() => {
		const root = window.document.documentElement;

		if (theme === 'system') {
			root.setAttribute('data-theme', systemTheme);
		} else {
			root.setAttribute('data-theme', theme);
		}
	}, [theme, systemTheme]);


	const ctx = {
		rawTheme: theme,
		systemTheme,
		get theme() {
			return theme === 'system' ? systemTheme : theme;
		},
		setTheme: (theme: 'light' | 'dark' | 'system') => {
			function set() {
				localStorage.setItem(storageKey, theme);
				setTheme(theme);
			}

			if (document.startViewTransition) {
				return document.startViewTransition(set);
			}

			set();
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={ctx}>
			<Helmet>
				<link rel='icon' type='image/png' href={`/img/logo-trimmed-${systemTheme}.png`} />
			</Helmet>
			{children}
		</ThemeProviderContext.Provider>
	);
}