import menu from './config/menu.json';
import en from './i18n/en-US.json';

const missing: { en: string[], fr: string[]; } = { en: [], fr: [] };

for (const item of menu) {
	// tags.find(t => t.category === )
	if (!en[item.name]) missing.en.push(item.name);
	if (!en[item.description]) missing.en.push(item.description);
	// if (!en[item.tags]) missing.en.push(item.name);
	// if (!en[item.description]) missing.en.push(item.description);

}

console.log('Missing en-US Strings:');
for (const string of missing.en) {
	console.log(string);
}