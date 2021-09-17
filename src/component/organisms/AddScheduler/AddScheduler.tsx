import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useReactiveVar } from '@apollo/client'

import {
	addStorage,
	nowDay,
	monthStorage,
	yearStorage,
	isDuplicated,
} from '../../../stores/store'

import StorageType from '../../../types/type'

import * as S from './style'

const AddScheduler: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const monthStorageProps = useReactiveVar(monthStorage)
	const yearStorageProps = useReactiveVar(yearStorage)
	const m = moment()
	const [timeError, setTimeError] = useState<boolean>(false)

	const [timeStyle, setTimeStyle] = useState<string>('')
	const [titleHolder, setTitleHolder] = useState<string>('Title')
	const [spanText, setSpanText] = useState<string>('Add Schedule')
	const [arrowBoolean, setArrowBoolean] = useState<boolean>(true)

	const [day, setDay] = useState<number>(m.date())
	const [month, setMonth] = useState<number>(m.month() + 1)
	const [year, setYear] = useState<number>(m.year())
	const [addSchedule, setAddSchedule] = useState<boolean>(false)
	const [title, setTitle] = useState<string>('')
	const [startHours, setStartHours] = useState<number | string>(m.hour())
	const [startMinutes, setStartMinutes] = useState<number | string>(0)
	const [endHours, setEndHours] = useState<number | string>(m.hour() + 1)
	const [endMinutes, setEndMinutes] = useState<number | string>(0)
	const [color, setColor] = useState<string>('#04B910')

	const [keyType, setKeyType] = useState<string>('')

	const onChangeTitle = (e: any): void => {
		setTitle(e.target.value)
		if (title) {
			setTitleHolder('Title')
		}
	}

	const onChangeYear = (e: any): void => {
		setYear(e.target.value)
		if (e.target.value > 9999) {
			setYear(9999)
		}
	}

	const lastDay = m
		.set({
			year: Number(year),
			month: Number(month - 1),
		})
		.endOf('month')
		.date()

	const onChangeMonth = (e: any): void => {
		setMonth(e.target.value)
		if (e.target.value > 12) {
			setMonth(12)
		}
		setDay(15)
	}

	const onChangeDay = (e: any): void => {
		setDay(e.target.value)
		if (e.target.value > lastDay) {
			setDay(lastDay)
		}
	}

	const isOverTime: boolean =
		Number(String(endHours) + String(endMinutes)) <
		Number(String(startHours) + String(startMinutes))

	const onChangeSHours = (e: any): void => {
		if (Number(e.target.value) < 10) {
			setStartHours(`0${e.target.value}`)
		} else {
			setStartHours(e.target.value)
		}
		if (isOverTime) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const onChangeSMinutes = (e: any): void => {
		if (Number(e.target.value) < 10) {
			setStartMinutes(`0${e.target.value}`)
		} else {
			setStartMinutes(e.target.value)
		}
		if (isOverTime) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const onChangeEHours = (e: any): void => {
		if (Number(e.target.value) < 10) {
			setEndHours(`0${e.target.value}`)
		} else {
			setEndHours(e.target.value)
		}
		if (isOverTime) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const onChangeEMinutes = (e: any): void => {
		if (Number(e.target.value) < 10) {
			setEndMinutes(`0${e.target.value}`)
		} else {
			setEndMinutes(e.target.value)
		}
		if (isOverTime) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const onChangeColor = (e: any): void => {
		setColor(e.target.value)
	}

	const onClickAddSchedule = (): void => {
		if (!addSchedule) {
			setAddSchedule(true)
			setSpanText('Close Scheduler')
			setArrowBoolean(false)
			setStartHours(m.hour())
			setStartMinutes('00')
			setEndHours(m.hour() + 1)
			setEndMinutes('00')
			setDay(nowDayProps)
			setMonth(monthStorageProps + 1)
			setYear(yearStorageProps)
		} else {
			setAddSchedule(false)
			setSpanText('Add Schedule')
			setArrowBoolean(true)
		}
	}

	const onClickSubmit = (): void => {
		const blockStorage: StorageType = {
			id: Math.random().toString(36).substr(2, 16),
			title,
			year,
			month,
			day,
			startHours: startHours === 0 ? '00' : startHours,
			startMinutes: startMinutes === 0 ? '00' : startMinutes,
			endHours: endHours === 0 ? '00' : endHours,
			endMinutes: endMinutes === 0 ? '00' : endMinutes,
			color,
		}
		if (isDuplicated(blockStorage)) {
			setTitle('')
			setSpanText('Add Schedule')
			setArrowBoolean(true)
			addStorage(blockStorage)
			setAddSchedule(false)
		} else {
			alert('There is same schedule alredy')
			setKeyType('')
		}
	}

	const clickSubmit = () => {
		if (title) {
			if (!isOverTime) {
				onClickSubmit()
			} else {
				setTimeError(true)
				setTimeStyle('1px solid red')
				setKeyType('')
			}
		} else {
			setTitleHolder('There must be a title')
			setKeyType('')
		}
	}

	const pushKey = (e: any) => {
		if(e.key === 'Escape' || e.keyCode === 27) {
			setKeyType('escape')
		} else if(e.key === 'Enter' || e.keyCode === 13) {
			setKeyType(`enter`)
		}
	}

	useEffect(()=>{
		window.addEventListener('keyup', pushKey)
	}, [])

	useEffect(()=>{
		if(addSchedule){
			if(keyType === 'enter'){
				clickSubmit()
			}else if(keyType === 'escape'){
				setAddSchedule(false)
				setSpanText('Add Schedule')
				setArrowBoolean(true)
				setKeyType('')
			}
		}else{
			if(keyType === 'escape'){
				setAddSchedule(true)
				setSpanText('Close Scheduler')
				setArrowBoolean(false)
				setStartHours(m.hour())
				setStartMinutes('00')
				setEndHours(m.hour() + 1)
				setEndMinutes('00')
				setDay(nowDayProps)
				setMonth(monthStorageProps + 1)
				setYear(yearStorageProps)
			}
			setKeyType('')
		}
		console.log(addSchedule,keyType)
	}, [keyType])

	return (
		<>
			<S.AddSchedule onKeyDown={(e:any)=>{e.preventDefault()}} onClick={onClickAddSchedule}>
				<S.AddScheduleSpan paddingRight={spanText}>
					{spanText}
				</S.AddScheduleSpan>
				<S.AddScheduleDiv animation={arrowBoolean}>▶</S.AddScheduleDiv>
			</S.AddSchedule>
			<S.Scheduler top={addSchedule}>
				<S.SchedulerHead>
					<S.SchedulerHeadInput
						spellCheck="false"
						placeholder={titleHolder}
						onChange={onChangeTitle}
						value={title}
					/>
				</S.SchedulerHead>
				<S.SchedulerBody>
					<S.SchedulerBodyTime>
						<S.TimeSpan>Date</S.TimeSpan>
						<S.TimeDiv>
							<S.NoStyleInput
								max="12"
								min="1"
								type="number"
								value={month}
								onChange={onChangeMonth}
							></S.NoStyleInput>
							/
							<S.NoStyleInput
								max={lastDay}
								min="1"
								type="number"
								value={day}
								onChange={onChangeDay}
							></S.NoStyleInput>
							/
							<S.NoStyleInput
								max="9999"
								min="1"
								type="number"
								value={year}
								onChange={onChangeYear}
							></S.NoStyleInput>
						</S.TimeDiv>
					</S.SchedulerBodyTime>
					<S.SchedulerBodyTime border={timeStyle}>
						<S.TimeSpan>Start</S.TimeSpan>
						<S.TimeDiv>
							<S.NoStyleInput
								max="24"
								min="0"
								type="number"
								value={startHours}
								onChange={onChangeSHours}
							></S.NoStyleInput>
							:
							<S.NoStyleInput
								max="59"
								min="0"
								type="number"
								value={startMinutes}
								onChange={onChangeSMinutes}
							></S.NoStyleInput>
						</S.TimeDiv>
						<S.TimeSpan> End </S.TimeSpan>
						<S.TimeDiv>
							<S.NoStyleInput
								max="24"
								min="0"
								type="number"
								value={endHours}
								onChange={onChangeEHours}
							></S.NoStyleInput>
							:
							<S.NoStyleInput
								max="59"
								min="0"
								type="number"
								value={endMinutes}
								onChange={onChangeEMinutes}
							></S.NoStyleInput>
						</S.TimeDiv>
						{timeError && (
							<S.SchedulerTimeError>
								Start time must not be earlier than end time
							</S.SchedulerTimeError>
						)}
					</S.SchedulerBodyTime>
					<S.SchedulerBodyColor>
						<S.SchedulerBodyColorSpan>Color</S.SchedulerBodyColorSpan>
						<S.SchedulerBodyColorInput
							type="color"
							value={color}
							onChange={onChangeColor}
						></S.SchedulerBodyColorInput>
					</S.SchedulerBodyColor>
				</S.SchedulerBody>
				<S.SchedulerFoot>
					<S.SchedulerFootButton backgroundColor={color} onClick={clickSubmit}>
						Add Event
					</S.SchedulerFootButton>
				</S.SchedulerFoot>
			</S.Scheduler>
		</>
	)
}
export default AddScheduler
