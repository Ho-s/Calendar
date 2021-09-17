import React from 'react'
import moment from 'moment'
import { useReactiveVar } from '@apollo/client'
import {
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
} from '../../../stores/store'

import today from '../../utils/today'

import * as S from './style'

const Calendar: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const nowMonthProps = useReactiveVar(nowMonth)
	const nowYearProps = useReactiveVar(nowYear)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const storageProps = useReactiveVar(storage)
	const m = moment()

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
			.map((_, i) => startWeek + i)
		return (
			<>
				{calendar.map((week: any) => {
					const thisWeekConst =
						today === m.clone().week(week).format('YYYYMMDD') ? 'today' : ''
					const weekSelected =
						Number(nowWeekProps) === week &&
						Number(yearStorageProps) === nowYearProps &&
						monthStorageProps === nowMonthProps
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
										Number(nowDayProps) === Number(current.format('D')) &&
										Number(yearStorageProps) === nowYearProps &&
										monthStorageProps === nowMonthProps
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
										storageProps.forEach((v: any) => {
											if (v.year === Number(nowYearProps)) {
												if (v.month === Number(nowMonthProps + 1)) {
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
											data-day={current.format('DD')}
											data-week={week}
											data-month={Number(current.format('MM')) - 1}
											data-year={current.format('YYYY')}
											data-what-day={i}
											onClick={clicking}
											data-gray={
												current.format('MM') === m.format('MM')
													? 'false'
													: 'true'
											}
											className={`${todaySelect} ${isGrayed} ${isSelected}`}
											key={`${week}${i}`}
										>
											{current.format('D')}
											<S.ThisDayWrapper>
												{day.map((v: any) => {
													return (
														<S.ThisDay
															key={v.id}
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

	return (
		<S.Calendar>
			<S.Body>
				<S.MonthSpan>
					{m.set('month', nowMonthProps).format('MMMM')}
				</S.MonthSpan>
				<S.YearSpan>{nowYearProps}</S.YearSpan>
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
