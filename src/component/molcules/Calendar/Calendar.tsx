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
	navBarClicked
} from '../../../stores/store'

import today from '../../../utils/today'
import scheduleStorage from '../../../utils/schedules'
import fourWeeks from '../../../utils/fourWeeks'

import * as S from './style'
import StorageType from 'types/type'

const Calendar: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const nowMonthProps = useReactiveVar(nowMonth)
	const nowYearProps = useReactiveVar(nowYear)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const storageProps = useReactiveVar(storage)
	const navBarClickedProps = useReactiveVar(navBarClicked)

	const m = moment()

	const Generate = () => {
		m.set('year', nowYearProps)
		m.set('month', nowMonthProps)
		return (
			<>
				{fourWeeks(nowMonthProps,nowYearProps).map((week: number) => {
					const thisWeekConst =
						today === m.clone().week(week).format('YYYYMMDD') ? 'today' : ''
					const weekSelected =
						nowWeekProps === week &&
						yearStorageProps === nowYearProps &&
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
										nowDayProps === Number(current.format('D')) &&
										yearStorageProps === nowYearProps &&
										monthStorageProps === nowMonthProps
											? 'selected'
											: ''
									const isGrayed =
										current.format('MM') === m.format('MM') ? '' : 'grayed'

									let schedules: StorageType[] = []
									if (current.format('MM') === m.format('MM')) {
										schedules=scheduleStorage(storageProps, nowYearProps,nowMonthProps+1,current.date())
									}

									return (
										<S.Box
											data-day={current.format('DD')}
											data-week={week}
											data-month={Number(current.format('MM')) - 1}
											data-year={current.format('YYYY')}
											data-what-day={i}
											onClick={										current.format('MM') === m.format('MM')
												? onClickDay
												: (() => {})}
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
												{schedules.slice(0,3).map((v: StorageType) => {
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
		<S.Calendar clicked={navBarClickedProps}>
			<S.Body clicked={navBarClickedProps}>
				<S.MonthSpan>
					{navBarClickedProps ? m.set('month', nowMonthProps).format('MMMM') : (nowMonthProps > 9 ? nowMonthProps : `0${nowMonthProps}`)}
				</S.MonthSpan>
				<S.YearSpan>{nowYearProps}</S.YearSpan>
				<S.BodyButton onClick={onClickRight}>&gt;</S.BodyButton>
				<S.BodyButton onClick={onClickLeft}>&lt;</S.BodyButton>
			</S.Body>
			<S.CalendarWrapper clicked={navBarClickedProps}>
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
			</S.CalendarWrapper>
		</S.Calendar>
	)
}
export default Calendar
