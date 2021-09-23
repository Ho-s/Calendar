import React from 'react'
import { useReactiveVar } from '@apollo/client'
import moment from 'moment'

import BaseTemplate from '../BaseTemplate/BaseTemplate'

import {
	nowWeek,
	monthStorage,
	yearStorage,
	storage,
} from '../../stores/store'

import today from '../../utils/today'
import scheduleStorage from '../../utils/schedules'

import * as S from './style'
import StorageType from 'types/type'

interface WeekProps {
	location: number
	lineTime: string
}

const Week: React.FunctionComponent<WeekProps> = ({location, lineTime}) => {
	const nowWeekProps = useReactiveVar(nowWeek)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const storageProps = useReactiveVar(storage)

	const m = moment()

	const Generate = () => {
		m.set('year', yearStorageProps)
		m.set('month', monthStorageProps)
		m.set('week', nowWeekProps)
		const week = m.week()
		return (
			<>
				{Array(7)
					.fill(0)
					.map((n, i) => {
						const current = m
							.week(week)
							.startOf('week')
							.add(n + i, 'day')
						const todaySelect =
							today === current.format('YYYYMMDD') ? 'week-selected' : ''
						const isGrayed =
							Number(current.format('MM')) === Number(monthStorageProps) + 1
								? ''
								: 'week-grayed'
						const whatDay = () => {
							switch (i) {
							case 0:
								return 'SUN'
							case 1:
								return 'MON'
							case 2:
								return 'TUE'
							case 3:
								return 'WED'
							case 4:
								return 'THU'
							case 5:
								return 'FRI'
							case 6:
								return 'SAT'
							default:
								return ''
							}
						}

						return (
							<S.BodyWrapper key={i}>
								<S.BodyTopWrapper>
									<S.WeekDay>{whatDay()}</S.WeekDay>
									<S.WeekBox className={`${todaySelect} ${isGrayed}`} key={i}>
										<S.WeekBoxSpan>{current.format('D')}</S.WeekBoxSpan>
									</S.WeekBox>
								</S.BodyTopWrapper>
								{Array(24)
									.fill(0)
									.map((_, i) => {
										return <S.TimeLine key={i} />
									})}
								{scheduleStorage(storageProps, current.year(),current.month() + 1, current.date()).map((v: StorageType, i: number) => {
									const height: number =
										(Number(v.endHours) - Number(v.startHours)) * 61 +
										Number(v.endMinutes) -
										Number(v.startMinutes)
									return (
										<S.ScheduleWrapper
											key={i}
											top={
												Number(v.startHours) * 61 +
												Number(v.startMinutes) +
												48.55
											}
											height={height}
										>
											<S.ScheduleBack backgroundColor={v.color} />
											<S.ScheduleBody top={-height}>
												<S.ScheduleBodyBack
													height={height}
													backgroundColor={v.color}
												/>
												<S.ScheduleTime>
													{v.startHours}:{v.startMinutes} ~ {v.endHours}:{v.endMinutes}
												</S.ScheduleTime>
												<S.ScheduleTitle>{v.title}</S.ScheduleTitle>
											</S.ScheduleBody>
										</S.ScheduleWrapper>
									)
								})}
							</S.BodyWrapper>
						)
					})}
			</>
		)
	}



	return (
		<BaseTemplate>
			<S.WeekComponent>
				<S.WeekLeft>
					<S.WeekTitleWrapper>
						<S.WeekTitleWeek>
						CW{nowWeekProps}
						</S.WeekTitleWeek>
						<S.WeekTitleMonth>
							{m.set('month', monthStorageProps).format('MMMM')}
						</S.WeekTitleMonth>
						<S.WeekTitleYear>{yearStorageProps}</S.WeekTitleYear>
					</S.WeekTitleWrapper>
					{Array(24)
						.fill(0)
						.map((_, i) => {
							return <S.Time key={i}>{`${i + 1}:00`}</S.Time>
						})}
				</S.WeekLeft>
				<Generate />
				<S.RedLine top={`${location + 51}px`}>{lineTime}</S.RedLine>
			</S.WeekComponent>
		</BaseTemplate>
	)
}
export default Week
