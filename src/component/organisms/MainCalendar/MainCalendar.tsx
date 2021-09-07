import React, { useEffect, useState } from 'react';
import moment from 'moment'
import Day from '../../molcules/Day/Day'
import Week from '../../molcules/Week/Week'
import Month from '../../molcules/Month/Month'
import Year from '../../molcules/Year/Year'
import './style.css'

interface IMainCalendar {
    nowDay: number
    nowWeek: number
    nowMonth: number
    nowYear: number
    whatDay: number | string
    monthStorage: number
    yearStorage: number
    storage: any
    onClickToday: () => void
    onClickDayInMonth: any
    onClickDayInYear: any
    onClickDeleteInDayTable: any
}

const MainCalendar = ({
    nowDay,
    nowWeek,
    nowMonth,
    nowYear,
    whatDay,
    monthStorage,
    yearStorage,
    storage,
    onClickToday,
    onClickDayInMonth,
    onClickDayInYear,
    onClickDeleteInDayTable}: IMainCalendar) => {
    const m = moment()
    const [dayCheck, setDayCheck] = useState<boolean>(true)
    const [weekCheck, setWeekCheck] = useState<boolean>(false)
    const [monthCheck, setMonthCheck] = useState<boolean>(false)
    const [yearCheck, setYearCheck] = useState<boolean>(false)
    const [time, setTime] = useState<string>(m.format('HH:mm:ss'))

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

    const clickToday = () => {
        setDayCheck(true)
        setWeekCheck(false)
        setMonthCheck(false)
        setYearCheck(false)
        onClickToday()
    }

    const Generate = () => {
        let todayStyle = (dayCheck && Number(nowDay) === m.date() && Number(nowWeek) === m.week() && monthStorage === m.month() && yearStorage === m.year()) ? 'clicked' : ''
        return (
            <>
                <div onClick={clickToday} className={`main-calendar-head-div   ${todayStyle}`} style={{ position: 'absolute', left: '14px', lineHeight: 1.7 }}>Today</div>
                <div style={{ margin: '0 auto', lineHeight: 1.7 }}>
                    <span onClick={onClickDay} className={dayCheck ? 'clicked' : ''}>Day</span>
                    <span onClick={onClickWeek} className={weekCheck ? 'clicked' : ''}>Week</span>
                    <span onClick={onClickMonth} className={monthCheck ? 'clicked' : ''}>Month</span>
                    <span onClick={onClickYear} className={yearCheck ? 'clicked' : ''}>Year</span>
                </div>
                <div style={{ textAlign: 'center', fontWeight: 600, height: '28px', width: '80px', lineHeight: '1.7', backgroundColor: 'rgb(201, 201, 201)', borderRadius: '7px', fontSize: '', position: 'absolute', right: '14px' }}>{time}</div>
            </>
        )
    }


    useEffect(() => {
        const timer = setInterval(() => {
            setTime(m.format('HH:mm:ss'))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className='main-calendar'>
            <div className='main-calendar-head'>
                <Generate />
            </div>
            <div>
                {dayCheck && <Day nowDay={nowDay} nowWeek={nowWeek} monthStorage={monthStorage} yearStorage={yearStorage} whatDay={whatDay} storage={storage} onClickDeleteInDayTable={onClickDeleteInDayTable} />}
                {weekCheck && <Week nowDay={nowDay} nowWeek={nowWeek} monthStorage={monthStorage} yearStorage={yearStorage} storage={storage} />}
                {monthCheck && <Month nowDay={nowDay} nowWeek={nowWeek} monthStorage={monthStorage} yearStorage={yearStorage} nowMonth={nowMonth} nowYear={nowYear} onClickDayInMonth={onClickDayInMonth} storage={storage} />}
                {yearCheck && <Year nowDay={nowDay} nowWeek={nowWeek} monthStorage={monthStorage} yearStorage={yearStorage} nowMonth={nowMonth} nowYear={nowYear} onClickDayInYear={onClickDayInYear} storage={storage} />}
            </div>
        </div>
    )
};
export default MainCalendar