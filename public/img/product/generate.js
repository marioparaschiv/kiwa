const fs = require('fs');
const files = fs.readdirSync('.');

let i =0;

// console.log(JSON.stringify(files.map(r => {
// 	const name = r.replace('.png', '').replaceAll('-', '_').toUpperCase();

// 	return {
// 		"category": "MENU_CATEGORY_PLACEHOLDER",
// 		"description": `MENU_ITEM_${name}_DESCRIPTION`,
// 		"id": ++i,
// 		"image": `/img/product/${r}`,
// 		"name": `MENU_ITEM_${name}_NAME`,
// 		"price": 0.00,
// 		"tags": name.split('_').map(n => 'MENU_TAGS_' + n)
// 	};
// }), null, 2))
console.log(JSON.stringify(files.map(r => {
	const name = r.replace('.png', '').replaceAll('-', '_').toUpperCase();
	const tags = name.split('_').map(n => 'MENU_TAGS_' + n);

	const res =  {
		[`MENU_ITEM_${name}_NAME`]: `${name.split('_').map(r => r.toLowerCase()).map(capitalizeFirstLetter).join(' ')}`,
		[`MENU_ITEM_${name}_DESCRIPTION`]: `MENU_ITEM_${name}_DESCRIPTION`,
	};

	// for(const tag of tags) {
	// 	res[tag] = "PLACEHOLDER"
	// }

	return res;
}).reduce((acc, curr) => {
	return {...acc, ...curr}
}, {}), null, 2))

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}