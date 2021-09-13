import React, { useEffect, useState } from 'react'
import moment from 'moment'
import * as S from './style'

interface WeekProps {
	nowWeek: number
	monthStorage: number
	yearStorage: number
	storage: any
	location: number
	lineTime: string
}

const Week: React.FunctionComponent<WeekProps> = ({
	nowWeek,
	monthStorage,
	yearStorage,
	storage,
	location,
	lineTime,
}) => {
	const m = moment()
	const today = m.format('YYYYMMDD')

	const Generate = () => {
		m.set('year', yearStorage)
		m.set('month', monthStorage)
		m.set('week', nowWeek)
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
							Number(current.format('MM')) === Number(monthStorage) + 1
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

						const day: any = []
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
									.map((v, i) => {
										return <S.TimeLine key={i} />
									})}
								{day.map((v: any, i: number) => {
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
													{v.startHours}:{v.startMinutes}
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
		<S.WeekComponent>
			<S.WeekLeft>
				<S.WeekTitleWrapper>
					<S.WeekTitleWeek>
						CW{m.set('week', nowWeek).format('W')}
					</S.WeekTitleWeek>
					<S.WeekTitleMonth>
						{m.set('month', monthStorage).format('MMMM')}
					</S.WeekTitleMonth>
					<S.WeekTitleYear>{yearStorage}</S.WeekTitleYear>
				</S.WeekTitleWrapper>
				{Array(24)
					.fill(0)
					.map((v, i) => {
						return <S.Time key={i}>{`${i + 1}:00`}</S.Time>
					})}
			</S.WeekLeft>
			<Generate />
			<S.RedLine top={`${location}px`}>{lineTime}</S.RedLine>
		</S.WeekComponent>
	)
}
export default Week
