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
	const [whatDay, setWhatDay] = useState<number | string>(-1)
	const [yearStorage, setYearStorage] = useState<number>(m.year())
	const [monthStorage, setMonthStorage] = useState<number>(m.month())

	const [storage, setStorage] = useState<StorageType[]>([])
	const [year, setYear] = useState<number>(m.year())
	const [month, setMonth] = useState<number>(m.month() + 1)
	const [day, setDay] = useState<number>(m.date())

	const onClickDay = (e: any): void => {
		setNowDay(e.target.textContent)
		setNowWeek(e.target.parentNode.childNodes[0].textContent)
		setYearStorage(nowYear)
		setMonthStorage(nowMonth)
		setYear(nowYear)
		setMonth(nowMonth + 1)
		setDay(e.target.textContent)

		Array(8).forEach((v, i) => {
			if (
				e.target.parentNode.childNodes[i].textContent === e.target.textContent
			) {
				setWhatDay(i - 1)
			}
		})
	}

	const onClickWeek = (e: any): void => {
		if (e.target.parentNode.childNodes[1].dataset.gray === 'true') {
			setNowDay(1)
			setNowWeek(e.target.textContent)
			setYearStorage(nowYear)
			setMonthStorage(nowMonth)
			setYear(nowYear)
			setMonth(nowMonth + 1)
			setDay(1)
			Array(8).forEach((v, i) => {
				if (e.target.parentNode.childNodes[1].dataset.gray) {
					setWhatDay(i - 1)
				}
			})
		} else {
			setNowDay(e.target.parentNode.childNodes[1].textContent)
			setNowWeek(e.target.textContent)
			setYearStorage(nowYear)
			setMonthStorage(nowMonth)
			setWhatDay('Sunday')
			setYear(nowYear)
			setMonth(nowMonth + 1)
			setDay(e.target.parentNode.childNodes[1].textContent)
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

	const onClickDayInMonth = (e: any): void => {
		setNowDay(e.target.childNodes[0].textContent)
		setNowWeek(
			m
				.set({
					year: nowYear,
					month: nowMonth,
					date: e.target.childNodes[0].textContent,
				})
				.week() === 1 && e.target.childNodes[0].textContent > 24
				? 53
				: m
						.set({
							year: nowYear,
							month: nowMonth,
							date: e.target.childNodes[0].textContent,
						})
						.week(),
		)
		setYearStorage(nowYear)
		setMonthStorage(nowMonth)
		setYear(nowYear)
		setMonth(nowMonth + 1)
		setDay(e.target.childNodes[0].textContent)

		Array(7).forEach((v, i) => {
			if (
				e.target.parentNode.childNodes[i].childNodes[0].textContent ===
				e.target.childNodes[0].textContent
			) {
				setWhatDay(i - 1)
			}
		})
	}

	const onClickDayInYear = (e: any): void => {
		setNowDay(e.target.textContent)
		setNowWeek(
			m
				.set({
					year: nowYear,
					month: e.target.parentNode.parentNode.id,
					date: e.target.childNodes[0].textContent,
				})
				.week() === 1 && e.target.childNodes[0].textContent > 24
				? 53
				: m
						.set({
							year: nowYear,
							month: e.target.parentNode.parentNode.id,
							date: e.target.childNodes[0].textContent,
						})
						.week(),
		)
		setNowMonth(Number(e.target.parentNode.parentNode.id))
		setYearStorage(nowYear)
		setMonthStorage(Number(e.target.parentNode.parentNode.id))
		setYear(nowYear)
		setMonth(Number(e.target.parentNode.parentNode.id) + 1)
		setDay(e.target.textContent)
		Array(7).forEach((v, i) => {
			if (
				e.target.parentNode.childNodes[i].textContent === e.target.textContent
			) {
				setWhatDay(i)
			}
		})
	}

	const onClickDelete = (e: any): void => {
		const filteredStorage = storage.filter((v: StorageType) => {
			return v.name !== Number(e.target.parentNode.getAttribute('data-name'))
		})
		setStorage(filteredStorage)
	}

	const onClickDeleteInDayTable = (e: any): void => {
		const filteredStorage = storage.filter((v: StorageType) => {
			return v.name !== Number(e.target.parentNode.getAttribute('data-name'))
		})
		setStorage(filteredStorage)
	}

	useEffect(() => {
		localStorage.setItem('storage', JSON.stringify(storage))
		setStorage(JSON.parse(localStorage.getItem('storage') || '{}'))
	}, [storage])

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
					setMonth={propsSetMonth}
					setYear={propsSetYear}
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
					onClickToday={onClickToday}
					onClickDayInMonth={(e: any) => onClickDayInMonth(e)}
					onClickDayInYear={(e: any) => onClickDayInYear(e)}
					onClickDeleteInDayTable={(e: any) => onClickDeleteInDayTable(e)}
				/>
			</S.MainRight>
		</>
	)
}
export default Main
