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

import today from '../../component/utils/today'

import * as S from './style'
import StorageType from 'types/type'

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
		const startWeek = m.clone().startOf('month').week()
		const endWeek =
			m.clone().endOf('month').week() === 1
				? 53
				: m.clone().endOf('month').week()
		const calendar = Array(endWeek - startWeek + 1)
			.fill(0)
			.map((_, i) => startWeek + i)
		return (
			<>
				{calendar.map((week: number) => (
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
									Number(nowDayProps) === Number(current.format('D')) &&
									Number(yearStorageProps) === nowYearProps &&
									nowWeekProps === week
										? 'yearSelected'
										: ''
								const isGrayed =
									current.format('MM') === m.format('MM') ? '' : 'year-grayed'
								const clicking =
									current.format('MM') === m.format('MM')
										? onClickDay
										: (() => {})
								const day:StorageType[] = []
								if (current.format('MM') === m.format('MM')) {
									{
										storageProps.forEach((v: StorageType) => {
											if (v.year === Number(current.year())) {
												if (v.month === Number(current.month() + 1)) {
													if (v.day === Number(current.date())) {
														day.push(v)
													}
												}
											}
										})
									}
								}

								const color = () => {
									switch (day.length) {
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
										onClick={clicking}
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
			<>
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
			</>
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
