import React, { useEffect, useState } from 'react'
import moment from 'moment'
import * as S from './style'

interface DayProps {
	nowDay: number
	nowWeek: number
	monthStorage: number
	yearStorage: number
	whatDay: number | string
	storage: any
	onClickDeleteInDayTable: () => void
}

const Day = ({
	nowDay,
	nowWeek,
	monthStorage,
	yearStorage,
	whatDay,
	storage,
	onClickDeleteInDayTable,
}: DayProps) => {
	const m = moment()
	const [location, setLocation] = useState(m.hours() * 61 + m.minutes())
	const [time, setTime] = useState(m.format('LT'))

	const TimeLinesLeft = Array(24)
		.fill(0)
		.map((v, i) => {
			return (
				<S.TimeLineLeft>
					{i < 9 ? `0${i + 1}:00` : `${i + 1}:00`}
				</S.TimeLineLeft>
			)
		})

	const TimeLinesRight = () => {
		m.set('year', yearStorage)
		m.set('month', monthStorage)
		m.set('week', nowWeek)
		m.set('date', nowDay)
		return (
			<>
				<S.TimeLineRightWrapper>
					{Array(24)
						.fill(0)
						.map(() => (
							<S.TimeLineRight />
						))}
				</S.TimeLineRightWrapper>
			</>
		)
	}

	const TakeSchedule = () => {
		const day: any = []
		storage.forEach((v: any) => {
			if (v.year === Number(yearStorage)) {
				if (v.month === Number(monthStorage + 1)) {
					if (v.day === Number(nowDay)) {
						day.push(v)
					}
				}
			}
		})
		return (
			<>
				{day.map((v: any) => {
					const height =
						(Number(v.endHours) - Number(v.startHours)) * 61 +
						Number(v.endMinutes) -
						Number(v.startMinutes)
					return (
						<S.ScheduleWrapper
							top={Number(v.startHours) * 61 + Number(v.startMinutes)}
							height={height}
						>
							<S.ScheduleBack backgroundColor={v.color} />
							<S.ScheduleTextWrapper top={-height}>
								<S.ScheduleColor backgroundColor={v.color} height={height} />
								<S.ScheduleText>
									{v.startHours}:{v.startMinutes}
								</S.ScheduleText>
								<S.ScheduleText>{v.title}</S.ScheduleText>
							</S.ScheduleTextWrapper>
						</S.ScheduleWrapper>
					)
				})}
			</>
		)
	}

	const MakeATable = () => {
		const day: any = []
		{
			storage.forEach((v: any) => {
				if (v.year === Number(yearStorage)) {
					if (v.month === Number(monthStorage + 1)) {
						if (v.day === Number(nowDay)) {
							day.push(v)
						}
					}
				}
			})
		}
		return (
			<S.DayTable>
				<>
					{day.map((v: any) => (
						<S.TableWrapper data-name={v.name}>
							<S.TableTitle>{v.title}</S.TableTitle>
							<S.TableBody>
								<S.TableTextWrapper>
									<S.TableTextLeft>date</S.TableTextLeft>
									<S.TableTextRigth>
										{v.month}/{v.day}/{v.year}
									</S.TableTextRigth>
								</S.TableTextWrapper>
								<S.TableTextWrapper>
									<S.TableTextLeft>start</S.TableTextLeft>
									<S.TableTextRigth>
										{v.startHours}:{v.startMinutes}
									</S.TableTextRigth>
								</S.TableTextWrapper>
								<S.TableTextWrapper>
									<S.TableTextLeft>ends</S.TableTextLeft>
									<S.TableTextRigth>
										{v.endHours}:{v.endMinutes}
									</S.TableTextRigth>
								</S.TableTextWrapper>
								<S.TableTextWrapper>
									<S.TableTextLeft>display</S.TableTextLeft>
									<S.TableDisplay backgroundColor={v.color}></S.TableDisplay>
								</S.TableTextWrapper>
							</S.TableBody>
							<S.TableDeleteButton
								onClick={onClickDeleteInDayTable}
							></S.TableDeleteButton>
						</S.TableWrapper>
					))}
				</>
			</S.DayTable>
		)
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setLocation(m.hours() * 61 + m.minutes())
			setTime(m.format('LT'))
		}, 5000)
		return () => clearInterval(timer)
	}, [])

	return (
		<S.DayComponent>
			<S.DateStorage>
				<S.WeekStorage>CW{m.set('week', nowWeek).format('W')}</S.WeekStorage>
				<S.TodayStorage>
					{whatDay === -1
						? m.set('date', nowDay).format('dddd')
						: m.day(whatDay).format('dddd')}
				</S.TodayStorage>
				<S.MonthStorage>
					{`${m.set('month', monthStorage).format('MMMM')}${nowDay}`}
				</S.MonthStorage>
				<S.YearStorage>{yearStorage}</S.YearStorage>
			</S.DateStorage>
			<S.TimeTable>
				<S.RedLineWrapper top={`${location}px`}>
					<S.RedLine>{time}</S.RedLine>
				</S.RedLineWrapper>
				<TakeSchedule />
				<S.DayLeft>{TimeLinesLeft}</S.DayLeft>
				<TimeLinesRight />
			</S.TimeTable>
			<MakeATable />
		</S.DayComponent>
	)
}
export default Day
