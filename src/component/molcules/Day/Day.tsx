import React, { useState } from 'react'
import useInterval from '../../utils/useInterval'
import moment from 'moment'
import * as S from './style'
import {
	nowDay,
	nowWeek,
	monthStorage,
	yearStorage,
	whatDay,
	storage,
	onClickDelete,
} from '../../../stores/store'
import { useReactiveVar } from '@apollo/client'

const Day: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const whatDayProps = useReactiveVar(whatDay)
	const storageProps = useReactiveVar(storage)
	const m = moment()
	const [dayLocation, setDayLocation] = useState(m.hours() * 61 + m.minutes())
	const [lineTime, setLineTime] = useState(m.format('LT'))

	const TimeLinesLeft = Array(24)
		.fill(0)
		.map((v, i) => {
			return (
				<S.TimeLineLeft key={i}>
					{i < 9 ? `0${i + 1}:00` : `${i + 1}:00`}
				</S.TimeLineLeft>
			)
		})

	const TimeLinesRight = () => {
		m.set('year', yearStorageProps)
		m.set('month', monthStorageProps)
		m.set('week', nowWeekProps)
		m.set('date', nowDayProps)
		return (
			<>
				<S.TimeLineRightWrapper>
					{Array(24)
						.fill(0)
						.map((v, i) => (
							<S.TimeLineRight key={i} />
						))}
				</S.TimeLineRightWrapper>
			</>
		)
	}

	const TakeSchedule = () => {
		const day: any = []
		storageProps.forEach((v: any) => {
			if (v.year === Number(yearStorageProps)) {
				if (v.month === Number(monthStorageProps + 1)) {
					if (v.day === Number(nowDayProps)) {
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
							key={v}
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
			storageProps.forEach((v: any) => {
				if (v.year === Number(yearStorageProps)) {
					if (v.month === Number(monthStorageProps + 1)) {
						if (v.day === Number(nowDayProps)) {
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
						<S.TableWrapper key={v.id} id={v.id}>
							<S.TableTitle>{v.title}</S.TableTitle>
							<S.TableBody>
								<S.TableTextWrapper>
									<S.TableTextLeft>Date</S.TableTextLeft>
									<S.TableTextRigth>
										{v.month}/{v.day}/{v.year}
									</S.TableTextRigth>
								</S.TableTextWrapper>
								<S.TableTextWrapper>
									<S.TableTextLeft>Start</S.TableTextLeft>
									<S.TableTextRigth>
										{v.startHours}:{v.startMinutes}
									</S.TableTextRigth>
								</S.TableTextWrapper>
								<S.TableTextWrapper>
									<S.TableTextLeft>End</S.TableTextLeft>
									<S.TableTextRigth>
										{v.endHours}:{v.endMinutes}
									</S.TableTextRigth>
								</S.TableTextWrapper>
								<S.TableTextWrapper>
									<S.TableTextLeft>Color</S.TableTextLeft>
									<S.TableDisplay backgroundColor={v.color}></S.TableDisplay>
								</S.TableTextWrapper>
							</S.TableBody>
							<S.TableDeleteButton
								onClick={onClickDelete}
							></S.TableDeleteButton>
						</S.TableWrapper>
					))}
				</>
			</S.DayTable>
		)
	}
	useInterval(() => {
		setDayLocation(m.hours() * 61 + m.minutes())
		setLineTime(m.format('LT') + '')
	}, 1000)

	return (
		<S.DayComponent>
			<S.DateStorage>
				<S.WeekStorage>
					CW{m.set('week', nowWeekProps).format('W')}
				</S.WeekStorage>
				<S.TodayStorage>
					{whatDayProps === -1
						? m.set('date', nowDayProps).format('dddd')
						: m.day(whatDayProps).format('dddd')}
				</S.TodayStorage>
				<S.MonthStorage>
					{`${m.set('month', monthStorageProps).format('MMMM')}${nowDayProps}`}
				</S.MonthStorage>
				<S.YearStorage>{yearStorageProps}</S.YearStorage>
			</S.DateStorage>
			<S.TimeTable>
				<S.RedLine top={`${dayLocation}px`}>{lineTime}</S.RedLine>
				<TakeSchedule />
				<S.DayLeft>{TimeLinesLeft}</S.DayLeft>
				<TimeLinesRight />
			</S.TimeTable>
			<MakeATable />
		</S.DayComponent>
	)
}
export default Day
