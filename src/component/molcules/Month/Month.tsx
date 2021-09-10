import React from 'react'
import moment from 'moment'
import * as S from './style'

interface IMonth {
	nowDay: number
	monthStorage: number
	yearStorage: number
	nowMonth: number
	nowYear: number
	onClickDayInMonth: () => void
	storage: any
}

const Month = ({
	nowDay,
	monthStorage,
	yearStorage,
	nowMonth,
	nowYear,
	onClickDayInMonth,
	storage,
}: IMonth) => {
	const m = moment()

	const Generate = () => {
		m.set('year', nowYear)
		m.set('month', nowMonth)
		const startWeek = m.clone().startOf('month').week()
		const endWeek =
			m.clone().endOf('month').week() === 1
				? 53
				: m.clone().endOf('month').week()
		const calendar = []
		for (let week = startWeek; week <= endWeek; week++) {
			calendar.push(
				<S.MonthRow key={week}>
					{Array(7)
						.fill(0)
						.map((n, i) => {
							const current = m
								.clone()
								.week(week)
								.startOf('week')
								.add(n + i, 'day')
							const todaySelected =
								m.format('YYYYMMDD') === current.format('YYYYMMDD')
									? 'month-selected'
									: ''
							const isSelected =
								Number(nowDay) === Number(current.format('D')) &&
								Number(yearStorage) === nowYear &&
								monthStorage === nowMonth
									? 'monthSelected'
									: ''
							const isGrayed =
								current.format('MM') === m.format('MM') ? '' : 'month-grayed'
							const clicking =
								current.format('MM') === m.format('MM')
									? onClickDayInMonth
									: (e: any) => e.preventDefault()

							const day: any = []
							if (current.format('MM') === m.format('MM')) {
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

							function compare(a: any, b: any) {
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

							return (
								<S.MonthBox
									onClick={clicking}
									className={`${todaySelected} ${isGrayed} ${isSelected}`}
									key={i}
								>
									<S.DaySpan>{current.format('D')}</S.DaySpan>
									<S.MonthDisplay>
										{day.map((v: any) => (
											<S.ScheduleWrapper>
												<S.ScheduleColor backgroundColor={v.color} />
												<S.ScheduleTitle>{v.title}</S.ScheduleTitle>
												<S.ScheduleTime>
													{v.startHours}:{v.startMinutes}
												</S.ScheduleTime>
											</S.ScheduleWrapper>
										))}
									</S.MonthDisplay>
								</S.MonthBox>
							)
						})}
				</S.MonthRow>,
			)
		}
		return calendar
	}

	return (
		<S.MonthComponent>
			<S.MonthTitleWrapper>
				<S.MonthTitleLeft>
					{m.set('month', nowMonth).format('MMMM')}
				</S.MonthTitleLeft>
				<S.MonthTitleRight>{nowYear}</S.MonthTitleRight>
			</S.MonthTitleWrapper>
			<S.MonthRow>
				<S.MonthDay>SUN</S.MonthDay>
				<S.MonthDay>MON</S.MonthDay>
				<S.MonthDay>TUE</S.MonthDay>
				<S.MonthDay>WED</S.MonthDay>
				<S.MonthDay>THU</S.MonthDay>
				<S.MonthDay>FRI</S.MonthDay>
				<S.MonthDay>SAT</S.MonthDay>
			</S.MonthRow>
			{Generate()}
		</S.MonthComponent>
	)
}
export default Month
