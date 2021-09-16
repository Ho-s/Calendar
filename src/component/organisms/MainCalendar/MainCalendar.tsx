import React, { useState } from 'react'
import moment from 'moment'
import Day from '../../molcules/Day/Day'
import Week from '../../molcules/Week/Week'
import Month from '../../molcules/Month/Month'
import Year from '../../molcules/Year/Year'
import useInterval from '../../utils/useInterval'
import * as S from './style'
import {
	nowDay,
	nowWeek,
	monthStorage,
	yearStorage,
	onClickToday,
} from '../../../stores/store'
import { useReactiveVar } from '@apollo/client'

const MainCalendar: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const m = moment()
	const [dayCheck, setDayCheck] = useState<boolean>(true)
	const [weekCheck, setWeekCheck] = useState<boolean>(false)
	const [monthCheck, setMonthCheck] = useState<boolean>(false)
	const [yearCheck, setYearCheck] = useState<boolean>(false)
	const [timeDetail, setTimeDetail] = useState<string>(m.format('HH:mm:ss'))

	const onClickDayButton = () => {
		setDayCheck(true)
		setWeekCheck(false)
		setMonthCheck(false)
		setYearCheck(false)
	}

	const onClickWeekButton = () => {
		setDayCheck(false)
		setWeekCheck(true)
		setMonthCheck(false)
		setYearCheck(false)
	}

	const onClickMonthButton = () => {
		setDayCheck(false)
		setWeekCheck(false)
		setMonthCheck(true)
		setYearCheck(false)
	}

	const onClickYearButton = () => {
		setDayCheck(false)
		setWeekCheck(false)
		setMonthCheck(false)
		setYearCheck(true)
	}

	const onClickTodayButton = () => {
		onClickDayButton()
		onClickToday()
	}

	const Generate = () => {
		const todayStyle =
			dayCheck &&
			Number(nowDayProps) === m.date() &&
			Number(nowWeekProps) === m.week() &&
			monthStorageProps === m.month() &&
			yearStorageProps === m.year()
				? 'clicked'
				: ''
		return (
			<>
				<S.TodayButton onClick={onClickTodayButton} className={todayStyle}>
					Today
				</S.TodayButton>
				<S.MainCalendarHeadMid>
					<S.HeadSpan
						onClick={onClickDayButton}
						className={dayCheck ? 'clicked' : ''}
					>
						Day
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickWeekButton}
						className={weekCheck ? 'clicked' : ''}
					>
						Week
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickMonthButton}
						className={monthCheck ? 'clicked' : ''}
					>
						Month
					</S.HeadSpan>
					<S.HeadSpan
						onClick={onClickYearButton}
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
			{dayCheck && <Day />}
			{weekCheck && <Week />}
			{monthCheck && <Month />}
			{yearCheck && <Year />}
		</S.MainCalendar>
	)
}
export default MainCalendar
