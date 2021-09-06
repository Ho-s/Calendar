import React, { useState, useEffect } from 'react';
import moment from 'moment'
import Calendar from '../component/organisms/Calendar/Calendar'
import Summary from '../component/organisms/Summary/Summary'
import MainCalendar from '../component/organisms/MainCalendar/MainCalendar'
import AddScheduler from '../component/organisms/AddScheduler/AddScheduler'
import './style.css'

const Main = () => {
    const [nowDay, setNowDay] = useState<number>(moment().date())
    const [nowWeek, setNowWeek] = useState<number>(moment().week())
    const [nowMonth, setNowMonth] = useState<number>(moment().month())
    const [nowYear, setNowYear] = useState<number>(moment().year())
    const [whatDay, setWhatDay] = useState<number | string>(-1)
    const [yearStorage, setYearStorage] = useState<number>(moment().year())
    const [monthStorage, setMonthStorage] = useState<number>(moment().month())

    const [addSchedule, setAddSchedule] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [year, setYear] = useState<number>(moment().year())
    const [month, setMonth] = useState<number>(moment().month() + 1)
    const [day, setDay] = useState<number>(moment().date())
    const [startHours, setStartHours] = useState<number | string>(moment().hour())
    const [startMinutes, setStartMinutes] = useState<number | string>(0)
    const [endHours, setEndHours] = useState<number | string>(moment().hour() + 1)
    const [endMinutes, setEndMinutes] =useState<number | string>(0)
    const [color,setColor] = useState<string>('#04B910')
    const [storage, setStorage] = useState<any[] | any>([])
    const [spanStyle, setSpanStyle] = useState<any>({
        paddingRight: 0,
        textContent: 'Add Schedule',
    })
    const [divStyle, setDivStyle] = useState<string>('')

    const onClickDay = (e: any):void => {
        setNowDay(e.target.textContent)
        setNowWeek(e.target.parentNode.childNodes[0].textContent)
        setYearStorage(nowYear)
        setMonthStorage(nowMonth)
        setYear(nowYear)
        setMonth(nowMonth + 1)
        setDay(e.target.textContent)

        Array(8).forEach((v, i) => {
            if(e.target.parentNode.childNodes[i].textContent === e.target.textContent) {
                setWhatDay(i - 1)
            }
        })
    }

    const onClickWeek = (e: any):void => {
        if (e.target.parentNode.childNodes[1].className === 'box  grayed ') {
            setNowDay(1)
            setNowWeek(e.target.textContent)
            setYearStorage(nowYear)
            setMonthStorage(nowMonth)
            setYear(nowYear)
            setMonth(nowMonth + 1)
            setDay(1)
            Array(8).forEach((v, i) => {
                if(e.target.parentNode.childNodes[i].className === 'box  grayed ') {
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

    const onClickToday = ():void => {
        setNowDay(moment().date())
        setNowWeek(moment().week())
        setNowMonth(moment().month())
        setNowYear(moment().year())
        setWhatDay(-1)
        setYearStorage(moment().year())
        setMonthStorage(moment().month())
        setYear(moment().year())
        setMonth(moment().month() + 1)
        setDay(moment().date())
    }

    const onClickRight = ():void => {
        if (nowMonth < 11) {
            setNowMonth((prev:number):number => prev + 1)
        } else {
            setNowMonth(0)
            setNowYear((prev:number):number => prev + 1)
        }
    }

    const onClickLeft = ():void => {
        if (nowMonth > 0) {
            setNowMonth((prev:number):number => prev - 1)
        } else {
            setNowMonth(11)
            setNowYear((prev:number):number => prev - 1)
        }
    }

    const onClickDayInMonth = (e: any):void => {
        setNowDay(e.target.childNodes[0].textContent)
        setNowWeek(moment().set({ 'year': nowYear, 'month': nowMonth, 'date': e.target.childNodes[0].textContent }).week() === 1 && e.target.childNodes[0].textContent > 24 ? 53 : moment().set({ 'year': nowYear, 'month': nowMonth, 'date': e.target.childNodes[0].textContent }).week())
        setYearStorage(nowYear)
        setMonthStorage(nowMonth)
        setYear(nowYear)
        setMonth(nowMonth + 1)
        setDay(e.target.childNodes[0].textContent)

        Array(7).forEach((v, i) => {
            if(e.target.parentNode.childNodes[i].childNodes[0].textContent === e.target.childNodes[0].textContent){
                setWhatDay(i - 1)
            }
        })
    }

    const onClickDayInYear = (e:any):void => {
        setNowDay(e.target.textContent)
        setNowWeek(moment().set({ 'year': nowYear, 'month': e.target.parentNode.parentNode.id, 'date': e.target.childNodes[0].textContent }).week() === 1 && e.target.childNodes[0].textContent > 24 ? 53 : moment().set({ 'year': nowYear, 'month': e.target.parentNode.parentNode.id, 'date': e.target.childNodes[0].textContent }).week())
        setNowMonth(Number(e.target.parentNode.parentNode.id))
        setYearStorage(nowYear)
        setMonthStorage(Number(e.target.parentNode.parentNode.id))
        setYear(nowYear)
        setMonth(Number(e.target.parentNode.parentNode.id) + 1)
        setDay(e.target.textContent)
        Array(7).forEach((v, i) => {
            if(e.target.parentNode.childNodes[i].textContent === e.target.textContent){
                setWhatDay(i)
            }
        })
    }

    //for AddSchedule
    const onChangeTitle = (e:any):void => {
        setTitle(e.target.value)
    }

    const onChangeYear = (e:any):void => {
        setYear(e.target.value)
    }

    const onChangeMonth = (e:any):void => {
        setMonth(e.target.value)
    }

    const onChangeDay = (e:any):void => {
        setDay(e.target.value)
    }

    const onChangeSHours = (e:any):void => {
        if (Number(e.target.value) < 10) {
            setStartHours(`0${e.target.value}`)
        } else {
            setStartHours(e.target.value)
        }
    }

    const onChangeSMinutes = (e:any):void => {
        if (Number(e.target.value) < 10) {
            setStartMinutes(`0${e.target.value}`)
        } else {
            setStartMinutes(e.target.value)
        }
    }

    const onChangeEHours = (e:any):void => {
        if (Number(e.target.value) < 10) {
            setEndHours(`0${e.target.value}`)
        } else {
            setEndHours(e.target.value)
        }
    }

    const onChangeEMinutes = (e:any):void => {
        if (Number(e.target.value) < 10) {
            setEndMinutes(`0${e.target.value}`)
        } else {
            setEndMinutes(e.target.value)
        }
    }

    const onChangeColor = (e:any):void => {
        setColor(e.target.value)
    }

    const onClickAddSchedule = (e:any):void => {
        if (!addSchedule) {
            setAddSchedule(true)
            setSpanStyle({ ...spanStyle, paddingRight: '20px', textContent: 'Close Scheduler' })
            setDivStyle('forward .4s forwards')
        } else {
            setAddSchedule(false)
            setSpanStyle({ ...spanStyle, paddingRight: '0', textContent: 'Add Schedule' })
            setDivStyle('backward .4s forwards')
        }
        setTitle('null')
        setYear(yearStorage)
        setMonth(monthStorage + 1)
        setDay(nowDay)
        setStartHours(moment().hour())
        setStartMinutes(0)
        setEndHours(moment().hour() + 1)
        setEndMinutes(0)
    }

    const onClickSubmit = ():void => {
        const blockStorage = {
            name: storage.length === 0 ? 0 : storage[storage.length - 1].name + 1,
            title,
            year: Number(year),
            month: Number(month),
            day: Number(day),
            week: Number(moment().set({ 'year': Number(year), 'month': Number(month - 1), 'date': Number(day) }).week()),
            startHours: startHours === 0 ? '00' : startHours,
            startMinutes: startMinutes === 0 ? '00' : startMinutes,
            endHours: endHours === 0 ? '00' : endHours,
            endMinutes: endMinutes === 0 ? '00' : endMinutes,
            color
        }
        if (storage.length !== 0) {
            for (let i = 0; i < storage.length; i++) {
                if (storage[i].startHours === blockStorage.startHours
                    && storage[i].startMinutes === blockStorage.startMinutes
                    && storage[i].endHours === blockStorage.endHours
                    && storage[i].endMinutes === blockStorage.endMinutes
                    && storage[i].year === blockStorage.year
                    && storage[i].month === blockStorage.month
                    && storage[i].day === blockStorage.day) {
                    alert('There is same schedule alredy')
                    break
                }
            }
        }
        setSpanStyle((prev: any) => ({ ...prev, paddingRight: '0', textContent: 'Add Schedule' }))
        setDivStyle('backward .4s forwards')
        setStorage((prev: any[]) => [...prev, blockStorage])
        setAddSchedule(false)
    }

    useEffect(() => {
        localStorage.setItem('storage', JSON.stringify(storage))
    }, [storage])

    const onClickDelete = (e:any):void => {
        const filteredStorage = storage.filter((v) => {
            return (
                v.name !== Number(e.target.parentNode.getAttribute('data-name'))
            )
        })
        setStorage(filteredStorage)
    }

    const onClickDeleteInDayTable = (e:any):void => {
        const filteredStorage = storage.filter((v) => {
            return (
                v.name !== Number(e.target.parentNode.getAttribute('data-name'))
            )
        })
        setStorage(filteredStorage)
    }

    useEffect(() => {
        setStorage(JSON.parse(localStorage.getItem('storage')))
    }, [])

    return (
        <>
            <div style={{ height: '100vh', float: 'left' }}>
                <div style={{ backgroundColor: '#292726' }}>
                    <button onClick={onClickAddSchedule} className='add-schedule'>
                        <span style={{ paddingRight: spanStyle.paddingRight, position: 'relative', transition: 'all .6s' }}>{spanStyle.textContent}</span>
                        <div style={{ animation: divStyle }} className='add-schedule-div'>▶</div>
                    </button>
                    {addSchedule &&
                        <AddScheduler
                            yearStorage={yearStorage}
                            monthStorage={monthStorage}
                            nowDay={nowDay}
                            addSchedule={addSchedule}

                            title={title}
                            year={year}
                            month={month}
                            day={day}
                            startHours={startHours}
                            startMinutes={startMinutes}
                            endHours={endHours}
                            endMinutes={endMinutes}
                            color={color}

                            onChangeTitle={(e:any) => {onChangeTitle}}
                            onChangeYear={(e:any) =>onChangeYear}
                            onChangeMonth={(e:any) =>onChangeMonth}
                            onChangeDay={(e:any) =>onChangeDay}
                            onChangeSHours={(e:any) =>onChangeSHours}
                            onChangeSMinutes={(e:any) =>onChangeSMinutes}
                            onChangeEHours={(e:any) =>onChangeEHours}
                            onChangeEMinutes={(e:any) =>onChangeEMinutes}
                            onChangeColor={(e:any) =>onChangeColor}
                            onClickSubmit={onClickSubmit}
                        />}
                </div>

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
                    onClickDay={(e:any)=>onClickDay}
                    onClickWeek={(e:any)=>onClickWeek}
                />

                <Summary
                    storage={storage}
                    onClickDelete={(e:any) =>{onClickDelete}}
                    nowDay={nowDay}
                    nowWeek={nowWeek}
                    nowMonth={nowMonth}
                    nowYear={nowYear}
                    monthStorage={monthStorage}
                    yearStorage={yearStorage}
                />
            </div>
            <div style={{ float: 'left' }}>
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
                    onClickDayInMonth={onClickDayInMonth}
                    onClickDayInYear={onClickDayInYear}
                    onClickDeleteInDayTable={onClickDeleteInDayTable}
                />
            </div>

        </>
    )
};
export default Main