import React from 'react'
import moment from 'moment'
import * as S from './style'
import {
	nowDay,
	monthStorage,
	yearStorage,
	nowMonth,
	nowYear,
	storage,
	onClickDay,
} from '../../../stores/store'
import { useReactiveVar } from '@apollo/client'

const Month: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const nowMonthProps = useReactiveVar(nowMonth)
	const nowYearProps = useReactiveVar(nowYear)
	const storageProps = useReactiveVar(storage)
	const m = moment()
	const today = m.format('YYYYMMDD')

	const Generate = () => {
		m.set('year', nowYearProps)
		m.set('month', nowMonthProps)
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
				{calendar.map((week: any) => (
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
									today === current.format('YYYYMMDD') ? 'month-selected' : ''
								const isSelected =
									Number(nowDayProps) === Number(current.format('D')) &&
									Number(yearStorageProps) === nowYearProps &&
									monthStorageProps === nowMonthProps
										? 'monthSelected'
										: ''
								const isGrayed =
									current.format('MM') === m.format('MM') ? '' : 'month-grayed'
								const clicking =
									current.format('MM') === m.format('MM')
										? onClickDay
										: (e: any) => e.preventDefault()

								const day: any = []
								if (current.format('MM') === m.format('MM')) {
									{
										storageProps.forEach((v: any) => {
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
										data-day={current.format('DD')}
										data-week={week}
										data-month={Number(current.format('MM')) - 1}
										data-year={current.format('YYYY')}
										data-what-day={i}
										onClick={clicking}
										className={`${todaySelected} ${isGrayed} ${isSelected}`}
										key={i}
									>
										<S.DaySpan>{current.format('D')}</S.DaySpan>
										<S.MonthDisplay>
											{day.map((v: any) => (
												<S.ScheduleWrapper key={v}>
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
					</S.MonthRow>
				))}
			</>
		)
	}

	return (
		<S.MonthComponent>
			<S.MonthTitleWrapper>
				<S.MonthTitleLeft>
					{m.set('month', nowMonthProps).format('MMMM')}
				</S.MonthTitleLeft>
				<S.MonthTitleRight>{nowYearProps}</S.MonthTitleRight>
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
