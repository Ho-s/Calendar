import React, { useState } from 'react'
import moment from 'moment'
import Day from '../../molcules/Day/Day'
import Week from '../../molcules/Week/Week'
import Month from '../../molcules/Month/Month'
import Year from '../../molcules/Year/Year'
import useInterval from '../../utils/useInterval'
import * as S from './style'

interface MainCalendarProps {
	nowDay: number
	nowWeek: number
	nowMonth: number
	nowYear: number
	whatDay: number | string
	monthStorage: number
	yearStorage: number
	storage: any
	clickToday: () => void
	onClickDayIn: any
	onClickDeleteInDayTable: any
}

const MainCalendar: React.FunctionComponent<MainCalendarProps> = ({
	nowDay,
	nowWeek,
	nowMonth,
	nowYear,
	whatDay,
	monthStorage,
	yearStorage,
	storage,
	clickToday,
	onClickDayIn,
	onClickDeleteInDayTable,
}) => {
	const m = moment()
	const [dayCheck, setDayCheck] = useState<boolean>(true)
	const [weekCheck, setWeekCheck] = useState<boolean>(false)
	const [monthCheck, setMonthCheck] = useState<boolean>(false)
	const [yearCheck, setYearCheck] = useState<boolean>(false)
	const [timeDetail, setTimeDetail] = useState<string>(m.format('HH:mm:ss'))

	const onClickDay = () => {
		setDayCheck(true)
		setWeekCheck(false)
		setMonthCheck(false)
		setYearCheck(false)
	}

	const onClickWeek = () => {
		setDayCheck(false)
		setWeekCheck(true)
		setMonthCheck(false)
		setYearCheck(false)
	}

	const onClickMonth = () => {
		setDayCheck(false)
		setWeekCheck(false)
		setMonthCheck(true)
		setYearCheck(false)
	}

	const onClickYear = () => {
		setDayCheck(false)
		setWeekCheck(false)
		setMonthCheck(false)
		setYearCheck(true)
	}

	const onClickToday = () => {
		onClickDay()
		clickToday()
	}

	const Generate = () => {
		const todayStyle =
			dayCheck &&
			Number(nowDay) === m.date() &&
			Number(nowWeek) === m.week() &&
			monthStorage === m.month() &&
			yearStorage === m.year()
				? 'clicked'
				: ''
		return (
			<>
				<S.TodayButton onClick={onClickToday} className={todayStyle}>
					Today
				</S.TodayButton>
				<S.MainCalendarHeadMid>
					<S.HeadSpan
						onClick={onClickDay}
						className={dayCheck ? 'clicked' : ''}
					>
						Day
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickWeek}
						className={weekCheck ? 'clicked' : ''}
					>
						Week
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickMonth}
						className={monthCheck ? 'clicked' : ''}
					>
						Month
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickYear}
						className={yearCheck ? 'clicked' : ''}
					>
						Year
					</S.HeadSpan>
				</S.MainCalendarHeadMid>
				<S.Time>{timeDetail}</S.Time>
			</>
		)
	}

	useInterval(() => {
		setTimeDetail(' ' + m.format('HH:mm:ss') + ' ')
	}, 1000)

	return (
		<S.MainCalendar>
			<S.MainCalendarHead>
				<Generate />
			</S.MainCalendarHead>
			{dayCheck && (
				<Day
					nowDay={nowDay}
					nowWeek={nowWeek}
					monthStorage={monthStorage}
					yearStorage={yearStorage}
					whatDay={whatDay}
					storage={storage}
					onClickDeleteInDayTable={onClickDeleteInDayTable}
				/>
			)}
			{weekCheck && (
				<Week
					nowWeek={nowWeek}
					monthStorage={monthStorage}
					yearStorage={yearStorage}
					storage={storage}
				/>
			)}
			{monthCheck && (
				<Month
					nowDay={nowDay}
					monthStorage={monthStorage}
					yearStorage={yearStorage}
					nowMonth={nowMonth}
					nowYear={nowYear}
					onClickDayInMonth={onClickDayIn}
					storage={storage}
				/>
			)}
			{yearCheck && (
				<Year
					nowDay={nowDay}
					nowWeek={nowWeek}
					yearStorage={yearStorage}
					nowYear={nowYear}
					onClickDayInYear={onClickDayIn}
					storage={storage}
				/>
			)}
		</S.MainCalendar>
	)
}
export default MainCalendar
