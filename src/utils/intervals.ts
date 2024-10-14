import moment, { type Moment } from 'moment';


function intervals(start: Moment, end: Moment) {
	const result = [];

	start.minutes(Math.ceil(start.minutes() / 15) * 15);

	const current = moment(start);

	while (current <= end) {
		result.push(current.clone());
		current.add(15, 'minutes');
	}

	return result;
}

export default intervals;