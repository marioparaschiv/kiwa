import IntlProvider from '~/components/providers/intl-provider';
import { useContext } from 'react';

function useLocalization() {
	const context = useContext(IntlProvider.Context);

	if (context === undefined) {
		throw new Error('useLocalization must be used within an IntlProvider');
	}

	return context;
};

export default useLocalization;