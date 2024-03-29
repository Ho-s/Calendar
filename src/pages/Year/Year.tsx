import React from 'react'
import moment from 'moment'
import { useReactiveVar } from '@apollo/client'

import BaseTemplate from '../BaseTemplate/BaseTemplate'

import {
	nowDay,
	nowWeek,
	yearStorage,
	storage,
	nowYear,
	onClickDay,
} from '../../stores/store'

import today from '../../utils/today'
import scheduleStorage from '../../utils/schedules'
import fourWeeks from '../../utils/fourWeeks'

import * as S from './style'

const Year: React.FunctionComponent = () => {
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	const yearStorageProps = useReactiveVar(yearStorage)
	const storageProps = useReactiveVar(storage)
	const nowYearProps = useReactiveVar(nowYear)
	const m = moment()

	const Generate = (year: number, month: number) => {
		m.set('year', year)
		m.set('month', month)
		return (
			<>
				{fourWeeks(month, year).map((week: number) => (
					<S.YearRow key={week}>
						{Array(7)
							.fill(0)
							.map((n, i) => {
								const current = m
									.clone()
									.week(week)
									.startOf('week')
									.add(n + i, 'day')
								const todaySelected =
									today === current.format('YYYYMMDD') ? 'year-selected' : ''
								const isSelected =
									nowDayProps === Number(current.format('D')) &&
									yearStorageProps === nowYearProps &&
									nowWeekProps === week
										? 'yearSelected'
										: ''
								const isGrayed =
									current.format('MM') === m.format('MM') ? '' : 'year-grayed'

								const color = () => {
									switch (scheduleStorage(storageProps,current.year(),current.month()+1,current.date()).length) {
									case 0:
										return ''
									case 1:
										return 'rgb(229, 255, 0)'
									case 2:
										return 'rgb(255, 238, 0)'
									case 3:
										return 'rgb(255, 204, 0)'
									case 4:
										return 'rgb(255, 170, 0)'
									case 5:
										return 'rgb(255, 106, 0)'
									default:
										return 'rgb(255, 106, 0)'
									}
								}
								return (
									<S.YearBox
										backgroundColor={color()}
										onClick={									current.format('MM') === m.format('MM')
											? onClickDay
											: (() => {})}
										data-day={current.format('DD')}
										data-week={week}
										data-month={Number(current.format('MM')) - 1}
										data-year={current.format('YYYY')}
										data-what-day={i}
										className={`${todaySelected} ${isGrayed} ${isSelected}`}
										key={i}
									>
										{current.format('D')}
									</S.YearBox>
								)
							})}
					</S.YearRow>
				))}
			</>
		)
	}

	const GenerateWrap = () => {
		return (
			<S.YearWrapper>
				{Array(12)
					.fill(0)
					.map((_, i) => {
						return (
							<S.MonthWrapper key={i}>
								<S.MonthTitle>{m.set('month', i).format('MMMM')}</S.MonthTitle>
								<S.YearRow>
									<S.YearDay>SUN</S.YearDay>
									<S.YearDay>MON</S.YearDay>
									<S.YearDay>TUE</S.YearDay>
									<S.YearDay>WED</S.YearDay>
									<S.YearDay>THU</S.YearDay>
									<S.YearDay>FRI</S.YearDay>
									<S.YearDay>SAT</S.YearDay>
								</S.YearRow>
								{Generate(nowYearProps, i)}
							</S.MonthWrapper>
						)
					})}
			</S.YearWrapper>
		)
	}

	return (
		<BaseTemplate>
			<S.YearComponent>
				<S.YearTitle>{nowYearProps}</S.YearTitle>
				{GenerateWrap()}
			</S.YearComponent>
		</BaseTemplate>
	)
}
export default Year
