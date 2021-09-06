import React, { useEffect, useState } from 'react';
import moment from 'moment'
import './style.css'

interface IWeek {
    nowDay: number
    nowWeek: number
    monthStorage: number
    yearStorage: number
    storage: any
}

const Week = ({
    nowDay,
    nowWeek,
    monthStorage,
    yearStorage,
    storage
}:IWeek) => {
    const [today, setToday] = useState(moment().format('YYYYMMDD'))
    const [time, setTime] = useState(moment().format('LT'))
    const [location, setLocation] = useState(moment().hours() * 61 + 51 + moment().minutes())

    const Generate = () => {
        moment().set('year', yearStorage)
        moment().set('month', monthStorage)
        moment().set('week', nowWeek)
        const week = moment().week();
        return (
            <>
                {Array(7).fill(0).map((n, i) => {
                    let current = moment().week(week).startOf('week').add(n + i, 'day')
                    let todaySelect = today === current.format('YYYYMMDD') ? 'week-selected' : '';
                    let isGrayed = Number(current.format('MM')) === Number(monthStorage) + 1 ? '' : 'week-grayed';
                    let sun = i === 0 ? 'SUN' : ''
                    let mon = i === 1 ? 'MON' : ''
                    let tue = i === 2 ? 'TUE' : ''
                    let wed = i === 3 ? 'WED' : ''
                    let thu = i === 4 ? 'THU' : ''
                    let fri = i === 5 ? 'FRI' : ''
                    let sat = i === 6 ? 'SAT' : ''

                    const day: any = []
                    {
                        Array(storage.length).forEach((v, n) => {
                            if (storage[n].year === Number(current.year())) {
                                if (storage[n].month === Number(current.month() + 1)) {
                                    if (storage[n].day === Number(current.date())) {
                                        day.push(storage[n])
                                    }
                                }
                            }
                        })
                    }

                    return (
                        <div style={{ position: 'relative', width: 'calc((100vw - 430px) / 7)', float: 'left' }}>
                            <div style={{ width: 'calc((100vw - 430px) / 7)', height: '50px' }}>
                                <div className="week-day">
                                    <span>{sun}{mon}{tue}{wed}{thu}{fri}{sat}</span>
                                </div>
                                <div className={`week-box  ${todaySelect} ${isGrayed} `} key={i}>
                                    <span>{current.format('D')}</span>
                                </div>
                            </div>
                            <div style={{ width: '100%' }}>
                                {Array(24).fill(0).map(() => {
                                    return (
                                        <div style={{ float: 'left', borderBottom: '1px solid #e9e9e9', height: '60px', width: '100%', borderLeft: '1px solid #e9e9e9' }}></div>
                                    )
                                })}
                            </div>
                            {Array(day.length).fill(0).map((v, n) => {
                                const height:number = (Number(day[n].endHours) - Number(day[n].startHours)) * 61 + Number(day[n].endMinutes) - Number(day[n].startMinutes)
                                const style = {
                                    position: 'absolute',
                                    top: Number(day[n].startHours) * 61 + Number(day[n].startMinutes) + 48.55,
                                    right: 0,
                                    width: '100%',
                                    height: height,
                                }
                                const back = {
                                    backgroundColor: day[n].color,
                                    opacity: '0.5',
                                    width: '100%',
                                    height: '100%',
                                    float: 'left'
                                }
                                return (
                                    <div style={style}>
                                        <div style={back}></div>
                                        <div style={{ position: 'relative', top: -height, fontSize: '15px', fontWeight: 600, color: 'black' }}>
                                            <div style={{ position: 'absolute', top: height, left: 0, backgroundColor: day[n].color, height: height, width: '10px' }}></div>
                                            <div style={{ marginLeft: '10px' }}>{day[n].startHours}:{day[n].startMinutes}</div>
                                            <div style={{ width: 'calc(100% - 10px)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', height: '17px', marginLeft: '10px' }}>{day[n].title}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </>
        )
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setLocation(moment().hours() * 61 + 51 + moment().minutes())
            setTime(moment().format('LT'))
        }, 5000)
        return clearInterval(timer)
    }, [])

    return (
        <div className='week-component'>
            <div style={{ float: 'left' }}>
                <div className='week-left'>
                    <div style={{ float: 'left', width: '70px', height: '55.55px', marginBottom: '45px', fontSize: '15px', fontWeight: 600 }}>
                        <div style={{ color: 'rgb(47, 72, 218)' }}>CW{moment().set('week', nowWeek).format('W')}</div>
                        <div style={{ color: 'black', fontSize: '14px' }}>{moment().set('month', monthStorage).format('MMMM')}</div>
                        <div style={{ color: 'red' }}>{yearStorage}</div>
                    </div>
                    <div>
                    {Array(24).fill(0).map((v, i) => {
                        return (
                            <div style={{ color: 'gray', fontWeight: 600, textAlign: 'right', float: 'left', height: '61px', width: '100%' }}>
                                {`${i + 1}:00`}
                            </div>
                        )
                    })}
                    </div>
                </div>
                <Generate />
            </div>
            <div style={{ borderBottom: '1px solid red', width: '100%', position: 'absolute', top: `${location}px` }}>
                <div style={{ fontWeight: 600, color: 'red', height: '0' }}>{time}</div>
            </div>
        </div>
    )
};
export default Week