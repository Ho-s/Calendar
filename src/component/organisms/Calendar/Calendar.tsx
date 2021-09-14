import React, { useEffect } from 'react'
import * as S from './style'
import moment from 'moment'

interface CalendarProps {
	nowDay: number
	nowWeek: number
	nowMonth: number
	nowYear: number
	monthStorage: number
	yearStorage: number
	storage: any
	onClickLeft: () => void
	onClickRight: () => void
	onClickDay: any
	onClickWeek: any
	setMonth: any
	setYear: any
}

const Calendar: React.FunctionComponent<CalendarProps> = ({
	nowDay,
	nowWeek,
	nowMonth,
	nowYear,
	monthStorage,
	yearStorage,
	storage,
	onClickLeft,
	onClickRight,
	onClickDay,
	onClickWeek,
	setMonth,
	setYear,
}) => {
	const m = moment()
	const today = m.format('YYYYMMDD')

	const Generate = () => {
		m.set('year', nowYear)
		m.set('month', nowMonth)
		const startWeek = m.clone().startOf('month').week()
		const endWeek =
			m.clone().endOf('month').week() === 1
				? 53
				: m.clone().endOf('month').week()
		const calendar = Array(endWeek - startWeek + 1)
			.fill(0)
			.map((v, i) => startWeek + i)
		return (
			<>
				{calendar.map((week: any) => {
					const thisWeekConst =
						today === m.clone().week(week).format('YYYYMMDD') ? 'today' : ''
					const weekSelected =
						Number(nowWeek) === week &&
						Number(yearStorage) === nowYear &&
						monthStorage === nowMonth
							? 'selected'
							: ''
					return (
						<S.Row key={week}>
							<S.Cw
								onClick={onClickWeek}
								className={`${thisWeekConst} ${weekSelected}`}
							>
								{week}
							</S.Cw>
							{Array(7)
								.fill(0)
								.map((n, i) => {
									const current = m
										.clone()
										.week(week)
										.startOf('week')
										.add(n + i, 'day')
									const todaySelect =
										today === current.format('YYYYMMDD') ? 'today' : ''
									const isSelected =
										Number(nowDay) === Number(current.format('D')) &&
										Number(yearStorage) === nowYear &&
										monthStorage === nowMonth
											? 'selected'
											: ''
									const clicking =
										current.format('MM') === m.format('MM')
											? onClickDay
											: (e: any) => e.preventDefault()
									const isGrayed =
										current.format('MM') === m.format('MM') ? '' : 'grayed'

									const day: any = []
									if (current.format('MM') === m.format('MM')) {
										storage.forEach((v: any) => {
											if (v.year === Number(nowYear)) {
												if (v.month === Number(nowMonth + 1)) {
													if (v.day === current.date()) {
														if (day.length < 3) {
															day.push(v)
														}
													}
												}
											}
										})
									}

									return (
										<S.Box
											onClick={clicking}
											data-gray={
												current.format('MM') === m.format('MM')
													? 'false'
													: 'true'
											}
											className={`${todaySelect} ${isGrayed} ${isSelected}`}
											key={i}
										>
											{current.format('D')}
											<S.ThisDayWrapper>
												{day.map((v: any) => {
													return (
														<S.ThisDay
															key={v.color}
															backgroundColor={v.color}
														></S.ThisDay>
													)
												})}
											</S.ThisDayWrapper>
										</S.Box>
									)
								})}
						</S.Row>
					)
				})}
			</>
		)
	}

	useEffect(() => {
		setYear(Number(m.set('year', nowYear).format('YYYY')))
		setMonth(nowMonth + 1)
	}, [nowDay, nowWeek])

	return (
		<S.Calendar>
			<S.Body>
				<S.MonthSpan>{m.set('month', nowMonth).format('MMMM')}</S.MonthSpan>
				<S.YearSpan>{nowYear}</S.YearSpan>
				<S.BodyButton onClick={onClickRight}>&gt;</S.BodyButton>
				<S.BodyButton onClick={onClickLeft}>&lt;</S.BodyButton>
			</S.Body>
			<S.Row>
				<S.DayCw>CW</S.DayCw>
				<S.Day>SUN</S.Day>
				<S.Day>MON</S.Day>
				<S.Day>TUE</S.Day>
				<S.Day>WED</S.Day>
				<S.Day>THU</S.Day>
				<S.Day>FRI</S.Day>
				<S.Day>SAT</S.Day>
			</S.Row>
			{Generate()}
		</S.Calendar>
	)
}
export default Calendar
