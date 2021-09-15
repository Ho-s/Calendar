import React, { useState, useEffect } from 'react'
import moment from 'moment'
import Calendar from '../../component/organisms/Calendar/Calendar'
import Summary from '../../component/organisms/Summary/Summary'
import MainCalendar from '../../component/organisms/MainCalendar/MainCalendar'
import AddScheduler from '../../component/organisms/AddScheduler/AddScheduler'
import * as S from './style'
import StorageType from '../../types/type'

const Main: React.FunctionComponent = () => {
	const m = moment()
	const [nowDay, setNowDay] = useState<number>(m.date())
	const [nowWeek, setNowWeek] = useState<number>(m.week())
	const [nowMonth, setNowMonth] = useState<number>(m.month())
	const [nowYear, setNowYear] = useState<number>(m.year())
	const [whatDay, setWhatDay] = useState<number>(-1)
	const [yearStorage, setYearStorage] = useState<number>(m.year())
	const [monthStorage, setMonthStorage] = useState<number>(m.month())

	const [storage, setStorage] = useState<StorageType[]>([])
	const [year, setYear] = useState<number>(m.year())
	const [month, setMonth] = useState<number>(m.month() + 1)
	const [day, setDay] = useState<number>(m.date())

	const onClickDay = (e: any): void => {
		const dateInfo = e.target.dataset
		setNowDay(Number(dateInfo.day))
		setNowWeek(Number(dateInfo.week))
		setNowMonth(Number(dateInfo.month))
		setNowYear(Number(dateInfo.year))
		setMonthStorage(Number(dateInfo.month))
		setYearStorage(Number(dateInfo.year))
		setDay(Number(dateInfo.day))
		setMonth(Number(dateInfo.month))
		setYear(Number(dateInfo.year))
		setWhatDay(Number(dateInfo.whatDay))
	}

	const onClickWeek = (e: any): void => {
		const firstDayOfTheMonth = m.month(nowMonth).startOf('month').format('d')
		const isGrayed = e.target.parentNode.childNodes[1].dataset.gray === 'true'

		if (isGrayed) {
			const dateInfo =
				e.target.parentNode.childNodes[Number(firstDayOfTheMonth) + 1].dataset
			setNowDay(1)
			setDay(1)
			setMonth(Number(dateInfo.month))
			setYear(Number(dateInfo.year))
			setMonthStorage(Number(dateInfo.month))
			setYearStorage(Number(dateInfo.year))
			setNowWeek(Number(dateInfo.week))
			setWhatDay(Number(firstDayOfTheMonth))
		} else {
			const dateInfo = e.target.parentNode.childNodes[1].dataset
			setNowDay(Number(dateInfo.day))
			setWhatDay(0)
			setMonth(Number(dateInfo.month))
			setYear(Number(dateInfo.year))
			setMonthStorage(Number(dateInfo.month))
			setYearStorage(Number(dateInfo.year))
			setNowWeek(Number(dateInfo.week))
			setDay(Number(dateInfo.day))
		}
	}

	const onClickToday = (): void => {
		setNowDay(m.date())
		setNowWeek(m.week())
		setNowMonth(m.month())
		setNowYear(m.year())
		setWhatDay(-1)
		setYearStorage(m.year())
		setMonthStorage(m.month())
		setYear(m.year())
		setMonth(m.month() + 1)
		setDay(m.date())
	}

	const onClickRight = (): void => {
		if (nowMonth < 11) {
			setNowMonth((prev: number): number => prev + 1)
		} else {
			setNowMonth(0)
			setNowYear((prev: number): number => prev + 1)
		}
	}

	const onClickLeft = (): void => {
		if (nowMonth > 0) {
			setNowMonth((prev: number): number => prev - 1)
		} else {
			setNowMonth(11)
			setNowYear((prev: number): number => prev - 1)
		}
	}

	const onClickDelete = (e: any): void => {
		const filteredStorage = storage.filter((v: StorageType) => {
			return v.id !== e.target.parentNode.id
		})
		setStorage(filteredStorage)
	}

	useEffect(() => {
		localStorage.setItem('storage', JSON.stringify(storage))
	}, [storage])

	useEffect(() => {
		setStorage(JSON.parse(localStorage.getItem('storage') || '{}'))
	}, [])

	useEffect(() => {
		setYear(Number(m.set('year', nowYear).format('YYYY')))
		setMonth(nowMonth + 1)
	}, [nowDay || nowWeek])

	const propsSetMonth = (v: number) => {
		setMonth(v)
	}

	const propsSetYear = (v: number) => {
		setYear(v)
	}

	const propsSetDay = (v: number) => {
		setDay(v)
	}

	const propsSetStorage = (v: StorageType[]) => {
		setStorage(v)
	}

	return (
		<>
			<S.MainLeft>
				<AddScheduler
					storage={storage}
					year={year}
					day={day}
					month={month}
					setMonth={propsSetMonth}
					setYear={propsSetYear}
					setDay={propsSetDay}
					setStorage={propsSetStorage}
				/>

				<Calendar
					nowDay={nowDay}
					nowWeek={nowWeek}
					nowMonth={nowMonth}
					nowYear={nowYear}
					monthStorage={monthStorage}
					yearStorage={yearStorage}
					storage={storage}
					onClickLeft={onClickLeft}
					onClickRight={onClickRight}
					onClickDay={(e: any) => onClickDay(e)}
					onClickWeek={(e: any) => onClickWeek(e)}
				/>

				<Summary
					storage={storage}
					onClickDelete={(e: any) => onClickDelete(e)}
					nowDay={nowDay}
					nowWeek={nowWeek}
					nowMonth={nowMonth}
					nowYear={nowYear}
					monthStorage={monthStorage}
					yearStorage={yearStorage}
				/>
			</S.MainLeft>
			<S.MainRight>
				<MainCalendar
					nowDay={nowDay}
					nowWeek={nowWeek}
					nowMonth={nowMonth}
					nowYear={nowYear}
					whatDay={whatDay}
					monthStorage={monthStorage}
					yearStorage={yearStorage}
					storage={storage}
					clickToday={onClickToday}
					onClickDayIn={(e: any) => onClickDay(e)}
					onClickDelete={(e: any) => onClickDelete(e)}
				/>
			</S.MainRight>
		</>
	)
}
export default Main
