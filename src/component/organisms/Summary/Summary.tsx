import React from 'react'
import moment from 'moment'
import { useReactiveVar } from '@apollo/client'

import {
	storage,
	nowDay,
	nowWeek,
	nowMonth,
	nowYear,
	monthStorage,
	yearStorage,
	onClickDelete,
} from '../../../stores/store'

import * as S from './style'
import StorageType from 'types/type'

const Summary: React.FunctionComponent = () => {
	const storageProps = useReactiveVar(storage)
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const nowMonthProps = useReactiveVar(nowMonth)
	const nowYearProps = useReactiveVar(nowYear)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const m = moment()

	const Generate = () => {
		m.set('year', yearStorageProps)
		m.set('month', monthStorageProps)
		m.set('week', nowWeekProps)
		let num = 0
		return (
			<S.LoadList>
				<S.Title>Schedules of the week</S.Title>
				{Array(7)
					.fill(0)
					.map((n: number, i: number) => {
						const current = m
							.week(m.week())
							.startOf('week')
							.add(n + i, 'day')
						const selectedColor =
							Number(nowDayProps) === Number(current.format('D')) &&
							Number(yearStorageProps) === nowYearProps &&
							monthStorageProps === nowMonthProps
								? '#4D4FFF'
								: 'gray'

						const day: StorageType[] = []
						if (
							Number(current.format('MM')) ===
							Number(monthStorageProps) + 1
						) {
							{
								storageProps.forEach((v: StorageType) => {
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

						const compare = (a: StorageType, b: StorageType) => {
							const A = Number(a.startHours) + Number(a.startMinutes)
							const B = Number(b.startHours) + Number(a.startMinutes)

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
								<S.DayWrapper key={i}>
									<S.Date key={i} color={selectedColor}>
										{current.month() + 1} / {current.date()} / {current.year()}{' '}
										{current.format('dddd')}
									</S.Date>
									{day.map((v: StorageType) => (
										<S.SummarySchedule key={v.id} id={v.id}>
											<S.SummaryScheduleColor
												backgroundColor={v.color}
											></S.SummaryScheduleColor>
											<S.SummaryScheduleTitle>{v.title}</S.SummaryScheduleTitle>
											<S.SummaryScheduleTimeLeft>
												{v.startHours}:{v.startMinutes}~
											</S.SummaryScheduleTimeLeft>
											<S.SummaryScheduleTimeRight>
												{v.endHours}:{v.endMinutes}
											</S.SummaryScheduleTimeRight>
											<S.SummaryScheduleButton onClick={onClickDelete} />
										</S.SummarySchedule>
									))}
								</S.DayWrapper>
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
