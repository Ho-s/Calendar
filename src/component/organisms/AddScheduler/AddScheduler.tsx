import React, { useState } from 'react'
import moment from 'moment'
import * as S from './style'

interface IAddScheduler {
	title: string
	year: number
	month: number
	day: number
	startHours: number | string
	startMinutes: number | string
	endHours: number | string
	endMinutes: number | string
	color: string

	onChangeTitle: any
	onChangeYear: any
	onChangeMonth: any
	onChangeDay: any
	onChangeSHours: any
	onChangeSMinutes: any
	onChangeEHours: any
	onChangeEMinutes: any
	onChangeColor: any
	onClickSubmit: () => void
}

const AddScheduler = ({
	title,
	year,
	month,
	day,
	startHours,
	startMinutes,
	endHours,
	endMinutes,
	color,
	onChangeTitle,
	onChangeYear,
	onChangeMonth,
	onChangeDay,
	onChangeSHours,
	onChangeSMinutes,
	onChangeEHours,
	onChangeEMinutes,
	onChangeColor,
	onClickSubmit,
}: IAddScheduler) => {
	const m = moment()
	const [timeError, setTimeError] = useState<boolean>(false)
	const [dayError, setDayError] = useState<boolean>(false)
	const [dayStyle, setDayStyle] = useState<string>('')
	const [timeStyle, setTimeStyle] = useState<string>('')
	const [titleStyle, setTitleStyle] = useState<any>({
		border: 0,
		backgroundColor: 'white',
		color: null,
		placeholder: 'Title',
	})

	const changeTitle = (): void => {
		onChangeTitle()
		if (title) {
			setTitleStyle((prev: any) => ({
				...prev,
				border: '0',
				placeholder: 'Title',
			}))
		}
	}

	const changeDay = (): void => {
		onChangeDay()
		if (
			day <=
			m
				.set({ year: Number(year), month: Number(month - 1) })
				.endOf('month')
				.date()
		) {
			setDayError(false)
			setDayStyle('')
		}
	}

	const changeSHours = () => {
		onChangeSHours()
		if (
			Number(String(endHours) + String(endMinutes)) -
				Number(String(startHours) + String(startMinutes)) <
			0
		) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const changeSMinutes = () => {
		onChangeSMinutes()
		if (
			Number(String(endHours) + String(endMinutes)) -
				Number(String(startHours) + String(startMinutes)) <
			0
		) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const changeEHours = () => {
		onChangeEHours()
		if (
			Number(String(endHours) + String(endMinutes)) -
				Number(String(startHours) + String(startMinutes)) <
			0
		) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const changeEMinutes = () => {
		onChangeEMinutes()
		if (
			Number(String(endHours) + String(endMinutes)) -
				Number(String(startHours) + String(startMinutes)) <
			0
		) {
			setTimeError(false)
			setTimeStyle('')
		}
	}

	const clickSubmit = () => {
		if (title) {
			if (
				Number(String(endHours) + String(endMinutes)) -
					Number(String(startHours) + String(startMinutes)) >
				0
			) {
				if (
					day <=
					m
						.set({ year: Number(year), month: Number(month - 1) })
						.endOf('month')
						.date()
				) {
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
			setTitleStyle((prev: any) => ({
				...prev,
				border: '4px solid red',
				placeholder: 'There must be a title',
				backgroundColor: 'red',
				color: 'white',
			}))
			setTimeout(() => {
				setTitleStyle((prev: any) => ({
					...prev,
					backgroundColor: 'transparent',
					color: 'black',
					border: '4px solid red',
					placeholder: 'There must be a title',
				}))
			}, 400)
		}
	}

	return (
		<S.Scheduler>
			<S.SchedulerHead>
				<S.SchedulerHeadInput
					spellCheck="false"
					placeholder={titleStyle.placeholder}
					border={titleStyle.border}
					backgroundColor={titleStyle.backgroundColor}
					color={titleStyle.color}
					onChange={changeTitle}
				/>
			</S.SchedulerHead>
			<S.SchedulerBody>
				<S.SchedulerBodyTime>
					<S.TimeSpan>date</S.TimeSpan>
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
							border={dayStyle}
							max={m
								.set({ year: Number(year), month: Number(month - 1) })
								.endOf('month')
								.date()}
							min="1"
							type="number"
							value={day}
							onChange={changeDay}
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
					{dayError && (
						<S.SchedulerDayError>
							This setting have to be under{' '}
							{m
								.set({ year: Number(year), month: Number(month - 1) })
								.endOf('month')
								.date() + 1}
						</S.SchedulerDayError>
					)}
				</S.SchedulerBodyTime>
				<S.SchedulerBodyTime border={timeStyle}>
					<S.TimeSpan>starts</S.TimeSpan>
					<S.TimeDiv>
						<S.NoStyleInput
							max="24"
							min="0"
							type="number"
							value={startHours}
							onChange={changeSHours}
						></S.NoStyleInput>
						:
						<S.NoStyleInput
							max="59"
							min="0"
							type="number"
							value={startMinutes}
							onChange={changeSMinutes}
						></S.NoStyleInput>
					</S.TimeDiv>
					<S.TimeSpan> ends </S.TimeSpan>
					<S.TimeDiv>
						<S.NoStyleInput
							max="24"
							min="0"
							type="number"
							value={endHours}
							onChange={changeEHours}
						></S.NoStyleInput>
						:
						<S.NoStyleInput
							max="59"
							min="0"
							type="number"
							value={endMinutes}
							onChange={changeEMinutes}
						></S.NoStyleInput>
					</S.TimeDiv>
					{timeError && (
						<S.SchedulerTimeError>
							Start time must not be earlier than end time
						</S.SchedulerTimeError>
					)}
				</S.SchedulerBodyTime>
				<S.SchedulerBodyColor>
					<S.SchedulerBodyColorSpan>display</S.SchedulerBodyColorSpan>
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
	)
}
export default AddScheduler
