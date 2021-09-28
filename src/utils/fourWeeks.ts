import moment from 'moment'

const fourWeeks = (month:number, year:number):number[] => {
	const m = moment()
	m.set('month',month)
	m.set('year',year)
	const startWeek = m.clone().startOf('month').week()
	const endWeek =
        m.clone().endOf('month').week() === 1
        	? 53
        	: m.clone().endOf('month').week()
	const calendar = Array(endWeek - startWeek + 1)
		.fill(0)
		.map((_, i) => startWeek + i)
	return calendar
}


export default fourWeeks