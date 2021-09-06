import React, { useEffect, useState } from 'react';
import moment from 'moment'
import './style.css'

interface IDay {
    nowDay: number
    nowWeek: number
    monthStorage: number
    yearStorage: number
    whatDay: number | string
    storage: any
    onClickDeleteInDayTable: () => void
}

const Day = ({nowDay,
    nowWeek,
    monthStorage,
    yearStorage,
    whatDay,
    storage,
    onClickDeleteInDayTable}:IDay) => {
    const [location, setLocation] = useState(moment().hours() * 61 + moment().minutes())
    const [time, setTime] = useState(moment().format('LT'))

    const Generate = () => {
        const today = moment();
        today.set('year', yearStorage)
        today.set('month', monthStorage)
        today.set('week', nowWeek)
        today.set('date', nowDay)
        return (
            <>
                <div style={{ width: '48vw', float: 'left' }}>
                    <div style={{ width: '100%' }}>
                        {Array(24).fill(0).map(() => (
                            <div style={{ float: 'left', borderBottom: '1px solid #e9e9e9', height: '60px', width: '100%', borderRight: '1px solid #e9e9e9' }}></div>
                        ))}
                    </div>
                </div>
            </>
        )
    }

    const TakeSchedule = () => {
        const day: any = []
        Array(storage.length).forEach((v, i) => {
            if (storage[i].year === Number(yearStorage)) {
                if (storage[i].month === Number(monthStorage + 1)) {
                    if (storage[i].day === Number(nowDay)) {
                        day.push(storage[i])
                    }
                }
            }
        })
        return (
            <>
                {Array(day.length).fill(0).map((v, i) => {
                    const height = (Number(day[i].endHours) - Number(day[i].startHours)) * 61 + Number(day[i].endMinutes) - Number(day[i].startMinutes)
                    const style = {
                        position: 'absolute',
                        top: Number(day[i].startHours) * 61 + Number(day[i].startMinutes),
                        right: 0,
                        width: '48vw',
                        height: height,
                    }
                    const back = {
                        backgroundColor: day[i].color,
                        opacity: '0.5',
                        width: '100%',
                        height: '100%',
                        float: 'left'
                    }
                    return (
                        <div style={style}>
                            <div style={back}></div>
                            <div style={{ position: 'relative', top: -height, fontSize: '15px', fontWeight: 600, color: 'black' }}>
                                <div style={{ position: 'absolute', top: height, left: 0, backgroundColor: day[i].color, height: height, width: '10px' }}></div>
                                <div style={{ marginLeft: '10px' }}>{day[i].startHours}:{day[i].startMinutes}</div>
                                <div style={{ marginLeft: '10px' }}>{day[i].title}</div>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }

    const MakeATable = () => {
        const day:any = []
        {
            Array(storage.length).fill(0).map((v, i) => {
                if (storage[i].year === Number(yearStorage)) {
                    if (storage[i].month === Number(monthStorage + 1)) {
                        if (storage[i].day === Number(nowDay)) {
                            day.push(storage[i])
                        }
                    }
                }
            })
        }
        return (
            <div className='day-table'>
                <>
                    {Array(day.length).fill(0).map((v, i) => (
                            <div data-name={day[i].name} style={{ position: 'relative', marginBottom: '20px', border: '1px solid #e9e9e9', backgroundColor: 'mintcream' }}>
                                <div style={{ width: '253px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', borderBottom: '1px solid #e9e9e9', padding: '15px', fontWeight: 600, fontSize: '20px' }}>{day[i].title}</div>
                                <div style={{ width: '300px', padding: '15px' }}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 600, marginRight: '20px' }}>date</span>
                                        <span>{day[i].month}/{day[i].day}/{day[i].year}</span>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 600, marginRight: '20px' }}>start</span>
                                        <span>{day[i].startHours}:{day[i].startMinutes}</span>
                                    </div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <span style={{ fontSize: '17px', fontWeight: 600, marginRight: '20px' }}>ends</span>
                                        <span>{day[i].endHours}:{day[i].endMinutes}</span>
                                    </div>
                                    <div style={{ height: '20px', marginBottom: '10px' }}>
                                        <span style={{ float: 'left', fontSize: '17px', fontWeight: 600, marginRight: '20px' }}>display</span>
                                        <div style={{ float: 'left', width: '20px', marginRight: '200px', height: '20px', backgroundColor: day[i].color }}></div>
                                    </div>
                                </div>
                                <div onClick={onClickDeleteInDayTable} style={{ position: 'absolute', top: '15px', right: '15px', backgroundRepeat: 'none', backgroundSize: 'contain', width: '24px', height: '24px', backgroundImage: 'url(https://user-images.githubusercontent.com/71132893/103125964-2e5e3580-46d0-11eb-9cdd-15ce0c5ca318.png)', cursor: 'pointer' }}></div>
                            </div>
                        )
                    )}
                </>
            </div>
        )
    }

    const whatDayToday = () => {
        if (whatDay === -1) {
            return moment().set('date', nowDay).format('dddd')
        } else {
            return moment().day(whatDay).format('dddd')
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setLocation(moment().hours() * 61 + moment().minutes())
            setTime(moment().format('LT'))
        }, 5000)
        return clearInterval(timer)
    },[])

    return (
        <div className='day-component'>
            <div style={{ marginLeft: '30px', height: '56px' }}>
                <span style={{ color: 'rgb(47, 72, 218)', fontSize: '15px', fontWeight: 600 }}>CW{moment().set('week', nowWeek).format('W')}</span>
                <span style={{ marginLeft: '20px', color: 'rgb(47, 72, 218)', fontSize: '40px', fontWeight: 600 }}>{whatDayToday()}</span>
                <span style={{ marginLeft: '10px', color: 'black', fontSize: '25px', fontWeight: 600 }}>{moment().set('month', monthStorage).format('MMMM')}{nowDay},</span>
                <span style={{ color: 'red', fontSize: '40px', fontWeight: 600 }}>{yearStorage}</span>
            </div>
            <div style={{ position: 'relative', float: 'left', height: '89vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ zIndex: 3, borderBottom: '1px solid red', width: '100%', position: 'absolute', top: `${location}px` }}>
                <div style={{ fontWeight: 600, color: 'red', height: '0' }}>{time}</div>
            </div>
                <TakeSchedule />
                <div className='day-left'>
                    {Array(24).fill(0).map((v, i) => {
                        return (
                            <div style={{ color: 'gray', fontWeight: 600, textAlign: 'right', lineHeight: '7.6', float: 'left', height: '61px', width: '100%', borderRight: '1px solid #e9e9e9' }}>
                                {`${i + 1}:00`}
                            </div>
                        )
                    })}
                </div>
                <Generate/>
            </div>
            <MakeATable />
        </div>
    )
};
export default Day