import React from 'react'
import moment from 'moment'
import { useReactiveVar } from '@apollo/client'

import BaseTemplate from '../BaseTemplate/BaseTemplate'

import {
	nowDay,
	monthStorage,
	yearStorage,
	nowMonth,
	nowYear,
	storage,
	onClickDay,
} from '../../stores/store'

import compare from '../../utils/compare'
import today from '../../utils/today'
import scheduleStorage from '../../utils/schedules'

import * as S from './style'
import StorageType from 'types/type'

const Month: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const nowMonthProps = useReactiveVar(nowMonth)
	const nowYearProps = useReactiveVar(nowYear)
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
				{calendar.map((week: number) => (
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
									nowDayProps === Number(current.format('D')) &&
									yearStorageProps === nowYearProps &&
									monthStorageProps === nowMonthProps
										? 'monthSelected'
										: ''
								const isGrayed =
									current.format('MM') === m.format('MM') ? '' : 'month-grayed'

								let schedules:StorageType[] = []
								if (current.format('MM') === m.format('MM')) {
									schedules=scheduleStorage(storageProps, current.year(),current.month()+1,current.date())
								}
								schedules.sort(compare)

								return (
									<S.MonthBox
										data-day={current.format('DD')}
										data-week={week}
										data-month={Number(current.format('MM')) - 1}
										data-year={current.format('YYYY')}
										data-what-day={i}
										onClick={									current.format('MM') === m.format('MM')
										? onClickDay
										: (() => {})}
										className={`${todaySelected} ${isGrayed} ${isSelected}`}
										key={i}
									>
										<S.DaySpan>{current.format('D')}</S.DaySpan>
										<S.MonthDisplay>
											{schedules.map((v: StorageType) => (
												<S.ScheduleWrapper key={v.id}>
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
		<BaseTemplate>
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
		</BaseTemplate>
	)
}
export default Month
