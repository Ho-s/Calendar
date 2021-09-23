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

import scheduleStorage from '../../../utils/schedules'
import compare from '../../../utils/compare'

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
							nowDayProps === Number(current.format('D')) &&
							yearStorageProps === nowYearProps &&
							monthStorageProps === nowMonthProps
								? '#4D4FFF'
								: 'gray'

						let schedules:StorageType[] = []
						if (Number(current.format('yyyy')) === nowYearProps) {
							schedules=scheduleStorage(storageProps, current.year(),current.month()+1,current.date())
						}
						schedules.sort(compare)

						if (schedules.length > 0) {
							num++
							return (
								<S.DayWrapper key={i}>
									<S.Date key={i} color={selectedColor}>
										{current.month() + 1} / {current.date()} / {current.year()}{' '}
										{current.format('dddd')}
									</S.Date>
									{schedules.map((v: StorageType) => (
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
										There is no schedule in this week
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
