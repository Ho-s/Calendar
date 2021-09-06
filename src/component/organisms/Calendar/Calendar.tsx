import React, { useEffect, useState } from 'react';
import './style.css'
import moment from 'moment'

interface ICalendar {
    nowDay:number
    nowWeek:number
    nowMonth:number
    nowYear:number
    monthStorage:number
    yearStorage:number
    storage:any
    onClickLeft:()=>void
    onClickRight:()=>void
    onClickDay:any
    onClickWeek:any
    setMonth:any
    setYear:any
}

const Calendar = ({nowDay,
    nowWeek,
    nowMonth,
    nowYear,
    monthStorage,
    yearStorage,
    storage,
    onClickLeft,
    onClickRight,
    onClickDay,
    onClickWeek,
    setMonth,
    setYear
}:ICalendar) => {
    const [today, setToday] = useState<string>(moment().format('YYYYMMDD'))
    const [thisWeek, setThisWeek] = useState<string>(moment().format('w'))

    const Generate = () => {
        moment().set('year', nowYear)
        moment().set('month', nowMonth)
        const startWeek = moment().clone().startOf('month').week();
        const endWeek = moment().clone().endOf('month').week() === 1 ? 53 : moment().clone().endOf('month').week();
        const calendar = [];
        for (let week = startWeek; week <= endWeek; week++) {
            const thisWeekConst = Number(thisWeek) === week ? 'today' : ''
            const weekSelected = (Number(nowWeek) === week && Number(yearStorage) === nowYear && monthStorage === nowMonth) ? 'selected' : ''
            calendar.push(
                <div className='row' key={week}>
                    <div onClick={onClickWeek} className={`cw ${thisWeekConst} ${weekSelected}`}>{week}</div>
                    {
                        Array(7).fill(0).map((n, i) => {
                            let current = moment().clone().week(week).startOf('week').add(n + i, 'day')
                            let todaySelect = today === current.format('YYYYMMDD') ? 'today' : '';
                            let isSelected = (Number(nowDay) === Number(current.format('D')) && Number(yearStorage) === nowYear && monthStorage === nowMonth) ? 'selected' : ''
                            let clicking = current.format('MM') === moment().format('MM') ? onClickDay : ((e: any) => e.preventDefault());
                            let isGrayed = current.format('MM') === moment().format('MM') ? '' : 'grayed';

                            const day: any = []
                            if (current.format('MM') === moment().format('MM')) {
                                Array(storage.length).forEach((v, n) => {
                                    if (storage[n].year === Number(nowYear)) {
                                        if (storage[n].month === Number(nowMonth + 1)) {
                                            if (storage[n].day === current.date()) {
                                                if (day.length < 3) {
                                                    day.push(storage[n])
                                                }
                                            }
                                        }
                                    }
                                })
                            }

                            return (
                                <div onClick={clicking} className={`box ${todaySelect} ${isGrayed} ${isSelected}`} key={i}>
                                    {current.format('D')}
                                    <div style={{ position: 'absolute', top: '15px', width: '33px', height: '10px', pointerEvents: 'none' }}>
                                        {Array(day.length).fill(0).map((v, n) => {
                                            return (
                                                <div style={{ marginLeft: '1px', marginRight: '1px', borderRadius: '6px', width: '6px', height: '6px', backgroundColor: day[n].color, display: 'inline-block' }}></div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        return calendar
    }

    useEffect(() => {
        setMonth()
        setYear()
    }, [])

    return (
        <div className="calendar">
            <div className="body">
                <span style={{ fontSize: '32px', fontWeight: 600 }} >{moment().set('month', nowMonth).format('MMMM')}</span>
                <span style={{ fontSize: '32px', color: 'red', fontWeight: 600 }}>{nowYear}</span>
                <button style={{ marginLeft: '10px' }} onClick={onClickRight}>&gt;</button>
                <button onClick={onClickLeft}>&lt;</button>
            </div>
            <div>
                <div className="row">
                    <div style={{ borderRight: '1px solid gray', color: 'gray' }} className="day">
                        <span>CW</span>
                    </div>
                    <div className="day">
                        <span>SUN</span>
                    </div>
                    <div className="day">
                        <span>MON</span>
                    </div>
                    <div className="day">
                        <span>TUE</span>
                    </div>
                    <div className="day">
                        <span>WED</span>
                    </div>
                    <div className="day">
                        <span>THU</span>
                    </div>
                    <div className="day">
                        <span>FRI</span>
                    </div>
                    <div className="day">
                        <span>SAT</span>
                    </div>
                </div>
                {Generate()}
            </div>
        </div>
    )
};
export default Calendar