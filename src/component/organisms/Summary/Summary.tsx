import React, {useState} from 'react';
import moment from 'moment'
import './style.css'

interface ISummary {
    storage: any[] | any
    onClickDelete: any
    nowDay: number
    nowWeek: number
    nowMonth:number
    nowYear:number
    monthStorage:number
    yearStorage:number
}

const Summary = ({storage,onClickDelete,nowDay,nowWeek,nowMonth,nowYear,monthStorage,yearStorage}: ISummary) => {
    const [today, setToday] = useState(moment().format('YYYYMMDD'))

    const Generate = () => {
        const today = moment();
        today.set('year', yearStorage)
        today.set('month', monthStorage)
        today.set('week', nowWeek)
        let num = 0
        return (
            <div className='load-list'>
                <span style={{ fontSize: '16px', fontWeight: 600, color: 'black', textShadow: '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white' }}>Schedules of the week</span>
                {Array(7).fill(0).map((n:any, i:number) => {
                    let current = today.week(today.week()).startOf('week').add(n + i, 'day')
                    let selectedColor = (Number(nowDay) === Number(current.format('D')) && Number(yearStorage) === nowYear && monthStorage === nowMonth) ? '#4D4FFF' : 'gray'

                    const day:any[] = []
                    if (Number(current.format('MM')) === Number(monthStorage) + 1) {
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
                    }

                    //for sorting
                    const compare = (a:any, b:any) => {
                        const A = Number(a.startHours + a.startMinutes)
                        const B = Number(b.startHours + a.startMinutes)

                        let comparison = 0;
                        if (A > B) {
                            comparison = 1
                        } else if (A < B) {
                            comparison = -1
                        }
                        return comparison
                    }
                    day.sort(compare)

                    if (day.length > 0) {
                        num++
                        return (
                            <>
                                <div style={{ color: selectedColor, fontWeight: 600, fontSize: '18PX', marginBottom: '10px' }}>{current.month() + 1} / {current.date()} / {current.year()}  {current.format('dddd')}</div>
                                {Array(day.length).fill(0).map((v, n) => (
                                    <div data-name={day[n].name} className='summary-schedule' >
                                        <div style={{ marginTop: '6px', position: 'absolute', left: '3px', width: '10px', height: '10px', backgroundColor: day[n].color, borderRadius: '10px' }}></div>
                                        <div style={{ lineHeight: '1', float: 'left', fontSize: '20px', marginLeft: '17px', width: '11.6vw', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 100, color: 'white' }}>{day[n].title}</div>
                                        <div style={{ lineHeight: '1.5', position: 'absolute', right: '40px', overflow: 'noWrap', fontSize: '14px', fontWeight: 600, color: 'gray' }}>{day[n].startHours}:{day[n].startMinutes}~</div>
                                        <div style={{ lineHeight: '1.5', position: 'absolute', right: '5px', overflow: 'noWrap', fontSize: '14px', fontWeight: 600, color: 'gray' }}>{day[n].endHours}:{day[n].endMinutes}</div>
                                        <button onClick={onClickDelete} className='summary-delete-button'></button>
                                    </div>
                                ))}
                            </>
                        )
                    } else {
                        if (i === 6 && num === 0) {
                            return (
                                <div style={{ color: 'gray', marginTop: '15px', fontSize: '15px' }}>There is no schedule in the week you selected</div>
                            )
                        }
                    }
                })}
            </div>
        )
    }


    return (
        <div className='summary'>
            <Generate />
        </div>
    )
};
export default Summary