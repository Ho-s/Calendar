import React, { useState } from 'react';
import moment from 'moment'
import './style.css'

interface IAddScheduler {
    yearStorage:number
    monthStorage:number
    nowDay:number
    addSchedule:boolean

    title:string
    year:number
    month:number
    day:number
    startHours:number | string
    startMinutes:number | string
    endHours:number | string
    endMinutes:number | string
    color:string

    onChangeTitle:any
    onChangeYear:any
    onChangeMonth:any
    onChangeDay:any
    onChangeSHours:any
    onChangeSMinutes:any
    onChangeEHours:any
    onChangeEMinutes:any
    onChangeColor:any
    onClickSubmit:() => void
}

const AddScheduler =({yearStorage,monthStorage,nowDay,addSchedule,title,year,month,day,startHours,startMinutes,endHours,endMinutes,color,onChangeTitle,
    onChangeYear,onChangeMonth,onChangeDay,onChangeSHours,onChangeSMinutes,onChangeEHours,onChangeEMinutes,onChangeColor,onClickSubmit}:IAddScheduler) => {

    const m = moment()
    const [timeError, setTimeError] = useState<boolean>(false)
    const [dayError, setDayError] = useState<boolean>(false)
    const [dayStyle, setDayStyle] = useState<string>('')
    const [timeStyle, setTimeStyle] = useState<string>('')
    const [titleStyle, setTitleStyle] = useState<any>({
        border: 0,
        backgroundColor: 'white',
        color: null,
        placeholder: 'Title'
    })


    const changeTitle = ():void => {
        onChangeTitle()
        if (title) {
            setTitleStyle((prev:any)=>({ ...prev, border: '0', placeholder: 'Title' }))
        }
    }

    const changeDay = ():void => {
        onChangeDay()
        if (day <= m.set({ 'year': Number(year), 'month': Number(month - 1) }).endOf('month').date()) {
            setDayError(false)
            setDayStyle('')
        }
    }

    const changeSHours = () => {
        onChangeSHours()
        if (Number(String(endHours) + String(endMinutes)) - Number(String(startHours) + String(startMinutes)) < 0) {
            setTimeError(false)
            setTimeStyle('')
        }
    }

    const changeSMinutes = () => {
        onChangeSMinutes()
        if (Number(String(endHours) + String(endMinutes)) - Number(String(startHours) + String(startMinutes)) < 0) {
            setTimeError(false)
            setTimeStyle('')
        }
    }

    const changeEHours = () => {
        onChangeEHours()
        if (Number(String(endHours) + String(endMinutes)) - Number(String(startHours) + String(startMinutes)) < 0) {
            setTimeError(false)
            setTimeStyle('')
        }
    }

    const changeEMinutes = () => {
        onChangeEMinutes()
        if (Number(String(endHours) + String(endMinutes)) - Number(String(startHours) + String(startMinutes)) < 0) {
            setTimeError(false)
            setTimeStyle('')
        }
    }

    const clickSubmit = () => {
        if (title) {
            if (Number(String(endHours) + String(endMinutes)) - Number(String(startHours) + String(startMinutes)) > 0) {
                if (day <= m.set({ 'year': Number(year), 'month': Number(month - 1) }).endOf('month').date()) {
                    onClickSubmit()
                } else {
                    setDayError(true)
                    setDayStyle('1px solid red')
                }
            } else {
                setTimeError(true)
                setTimeStyle('1px solid red')
            }
        } else {
            setTitleStyle((prev:any)=>({ ...prev, border: '4px solid red', placeholder: 'There must be a title', backgroundColor: 'red', color: 'white' }))
            setTimeout(() => {
                setTitleStyle((prev:any)=>({ ...prev, backgroundColor: 'transparent', color: 'black', border: '4px solid red', placeholder: 'There must be a title' }))
            }, 400)
        }
    }

    return (
        <div className='scheduler'>
            <div className='scheduler-head'>
                <input spellCheck='false' placeholder={titleStyle.placeholder} style={{ border: titleStyle.border, backgroundColor: titleStyle.backgroundColor, color: titleStyle.color }} onChange={changeTitle}></input>
            </div>
            <div className='scheduler-body'>
                <div style={{ marginBottom: '0' }} className='scheduler-body-time'>
                    <span style={{ float: 'left' }}>date</span>
                    <div style={{ marginLeft: '20px', float: 'left', }}>
                        <input max='12' min='1' type='number' value={month} onChange={onChangeMonth}></input>/
                        <input style={{ border: dayStyle }} max={m.set({ 'year': Number(year), 'month': Number(month - 1) }).endOf('month').date()} min='1' type='number' value={day} onChange={changeDay}></input>/
                        <input max='9999' min='1' type='number' value={year} onChange={onChangeYear}></input>
                    </div>
                    {dayError && <div className='scheduler-day-error'><span>This setting have to be under {m.set({ 'year': Number(year), 'month': Number(month - 1) }).endOf('month').date() + 1}</span></div>}
                </div>
                <div style={{ border: timeStyle }} className='scheduler-body-time'>
                    <span style={{ float: 'left' }}>starts</span>
                    <div style={{ marginLeft: '26px', float: 'left' }}>
                        <input max='24' min='0' type='number' style={{ marginRight: '10px' }} value={startHours} onChange={changeSHours}></input>:
                        <input max='59' min='0' style={{ marginLeft: '10px', marginRight: '130px' }} type='number' value={startMinutes} onChange={changeSMinutes}></input>
                    </div>
                    <span style={{ float: 'left', marginRight: '6px' }}>ends</span>
                    <div style={{ marginLeft: '26px', float: 'left' }}>
                        <input max='24' min='0' type='number' style={{ marginRight: '10px' }} value={endHours} onChange={changeEHours}></input>:
                        <input max='59' min='0' style={{ marginLeft: '10px' }} type='number' value={endMinutes} onChange={changeEMinutes}></input>
                    </div>
                    {timeError && <div className='scheduler-time-error'><span>Start time must not be earlier than end time</span></div>}
                </div>
                <div className='scheduler-body-color'>
                    <span style={{ float: 'left' }}>display</span>
                    <input type='color' value={color} onChange={onChangeColor}></input>
                </div>
            </div>
            <div className='scheduler-foot'>
                <button onClick={clickSubmit} style={{ backgroundColor: color }}>Add Event</button>
            </div>
        </div>
    )
};
export default AddScheduler