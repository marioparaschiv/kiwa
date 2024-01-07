import { IntlProviderContext } from '~/components/providers/intl-provider';
import { useContext } from 'react';

function useLocale() {
	const context = useContext(IntlProviderContext);

	if (context === undefined) {
		throw new Error('useLocale must be used within an IntlProvider');
	}

	return context;
};

export default useLocale;