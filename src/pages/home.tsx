import { Page } from '~/components/layouts';
import { Hammer } from 'lucide-react';
import i18n from 'i18n';
import EmptyState from '~/components/empty-state';

export const path = '/';
export const element = Home;

function Home() {
	return <Page>
		<EmptyState icon={<Hammer size={250} />} message={i18n.Messages.WORK_IN_PROGRESS} />
	</Page>;
}