import React from 'react'
import moment from 'moment'
import * as S from './style'

interface ISummary {
	storage: any[] | any
	onClickDelete: any
	nowDay: number
	nowWeek: number
	nowMonth: number
	nowYear: number
	monthStorage: number
	yearStorage: number
}

const Summary = ({
	storage,
	onClickDelete,
	nowDay,
	nowWeek,
	nowMonth,
	nowYear,
	monthStorage,
	yearStorage,
}: ISummary) => {
	const m = moment()

	const Generate = () => {
		m.set('year', yearStorage)
		m.set('month', monthStorage)
		m.set('week', nowWeek)
		let num = 0
		return (
			<S.LoadList>
				<S.Title>Schedules of the week</S.Title>
				{Array(7)
					.fill(0)
					.map((n: any, i: number) => {
						const current = m
							.week(m.week())
							.startOf('week')
							.add(n + i, 'day')
						const selectedColor =
							Number(nowDay) === Number(current.format('D')) &&
							Number(yearStorage) === nowYear &&
							monthStorage === nowMonth
								? '#4D4FFF'
								: 'gray'

						const day: any[] = []
						if (Number(current.format('MM')) === Number(monthStorage) + 1) {
							{
								storage.forEach((v: any) => {
									if (v.year === Number(current.year())) {
										if (v.month === Number(current.month() + 1)) {
											if (v.day === Number(current.date())) {
												day.push(v)
											}
										}
									}
								})
							}
						}

						// for sorting
						const compare = (a: any, b: any) => {
							const A = Number(a.startHours + a.startMinutes)
							const B = Number(b.startHours + a.startMinutes)

							let comparison = 0
							if (A > B) {
								comparison = 1
							} else if (A < B) {
								comparison = -1
							}
							return comparison
						}
						day.sort(compare)

						if (day.length > 0) {
							num++
							return (
								<>
									<S.Date color={selectedColor}>
										{current.month() + 1} / {current.date()} / {current.year()}{' '}
										{current.format('dddd')}
									</S.Date>
									{day.map((v: any) => (
										<S.SummarySchedule key={v.name} data-name={v.name}>
											<S.SummaryScheduleColor
												backgroundColor={v.color}
											></S.SummaryScheduleColor>
											<S.SummaryScheduleTitle>{v.title}</S.SummaryScheduleTitle>
											<S.SummaryScheduleTime>
												{v.startHours}:{v.startMinutes}~
											</S.SummaryScheduleTime>
											<S.SummaryScheduleTime>
												{v.endHours}:{v.endMinutes}
											</S.SummaryScheduleTime>
											<S.SummaryScheduleButton onClick={onClickDelete} />
										</S.SummarySchedule>
									))}
								</>
							)
						} else {
							if (i === 6 && num === 0) {
								return (
									<S.NoSchedule>
										There is no schedule in the week you selected
									</S.NoSchedule>
								)
							}
						}
					})}
			</S.LoadList>
		)
	}

	return (
		<S.Summary>
			<Generate />
		</S.Summary>
	)
}
export default Summary
