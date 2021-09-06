import React, { PureComponent, useState } from 'react';
import moment from 'moment'
import './style.css'


interface IYear {
    nowDay: number
    nowWeek: number
    monthStorage: number
    yearStorage: number
    storage: any
    nowMonth: number
    nowYear: number
    onClickDayInYear:() => void
}

const Year = ({
    nowDay,
    nowWeek,
    monthStorage,
    yearStorage,
    storage,
    nowMonth,
    nowYear,
    onClickDayInYear
}: IYear) => {
    const [today, setToday] = useState(moment().format('YYYYMMDD'))

    const Generate = (year: any, month: any) => {
        moment().set('year', year)
        moment().set('month', month)
        const startWeek = moment().clone().startOf('month').week();
        const endWeek = moment().clone().endOf('month').week() === 1 ? 53 : moment().clone().endOf('month').week();
        const calendar = [];
        for (let week = startWeek; week <= endWeek; week++) {
            calendar.push(
                <div className="year-row" key={week}>
                    {
                        Array(7).fill(0).map((n, i) => {
                            const current = moment().clone().week(week).startOf('week').add(n + i, 'day')
                            const todaySelected = today === current.format('YYYYMMDD') ? 'year-selected' : '';
                            const isSelected = (Number(nowDay) === Number(current.format('D')) && Number(yearStorage) === nowYear && nowWeek === week) ? 'yearSelected' : ''
                            const isGrayed = current.format('MM') === moment().format('MM') ? '' : 'year-grayed';
                            const clicking = current.format('MM') === moment().format('MM') ? onClickDayInYear : ((e: any) => e.preventDefault());
                            const day = []
                            if (current.format('MM') === moment().format('MM')) {
                                {Array(storage.length).forEach((v, n) => {
                                    if (storage[n].year === Number(current.year())) {
                                        if (storage[n].month === Number(current.month() + 1)) {
                                            if (storage[n].day === Number(current.date())) {
                                                day.push(storage[n])
                                            }
                                        }
                                    }
                                })}
                            }
                            const zero = day.length === 0 ? '' : ''
                            const one = day.length === 1 ? 'rgb(229, 255, 0)' : ''
                            const two = day.length === 2 ? 'rgb(255, 238, 0)' : ''
                            const three = day.length === 3 ? 'rgb(255, 204, 0)' : ''
                            const four = day.length === 4 ? 'rgb(255, 170, 0)' : ''
                            const five = day.length >= 5 ? 'rgb(255, 106, 0)' : ''
                            const color = `${zero}${one}${two}${three}${four}${five}`
                            return (
                                <div onClick={clicking} style={{ backgroundColor: color }} className={`year-box  ${todaySelected} ${isGrayed} ${isSelected}`} key={i}>
                                    {current.format('D')}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        return calendar
    }

    const GenerateWrap = () => {
        return (
            <>
                {Array(12).fill(0).map((v, i) => (
                    <div id={i.toString()} style={{ marginRight: '10px', height: '28vh', float: 'left', marginTop: '20px' }}>
                        <div style={{ fontWeight: 600, marginBottom: '5px' }}>{moment().add(i - 2, 'month').format('MMMM')}</div>
                        <div className="year-row">
                            <div className="year-day">
                                <span>SUN</span>
                            </div>
                            <div className="year-day">
                                <span>MON</span>
                            </div>
                            <div className="year-day">
                                <span>TUE</span>
                            </div>
                            <div className="year-day">
                                <span>WED</span>
                            </div>
                            <div className="year-day">
                                <span>THU</span>
                            </div>
                            <div className="year-day">
                                <span>FRI</span>
                            </div>
                            <div className="year-day">
                                <span>SAT</span>
                            </div>
                        </div>
                        {Generate(nowYear, i)}
                    </div>
                ))}
            </>
        )
    }

    return (
        <div className='year-component'>
            <div style={{ color: 'red', fontSize: '30px' }}>{nowYear}</div>
            {GenerateWrap()}
        </div>
    )
};
export default Year