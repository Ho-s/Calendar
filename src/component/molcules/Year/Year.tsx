import React from 'react'
import moment from 'moment'
import * as S from './style'

interface IYear {
	nowDay: number
	nowWeek: number
	yearStorage: number
	storage: any
	nowYear: number
	onClickDayInYear: () => void
}

const Year = ({
	nowDay,
	nowWeek,
	yearStorage,
	storage,
	nowYear,
	onClickDayInYear,
}: IYear) => {
	const m = moment()

	const Generate = (year: any, month: any) => {
		m.set('year', year)
		m.set('month', month)
		const startWeek = m.clone().startOf('month').week()
		const endWeek =
			m.clone().endOf('month').week() === 1
				? 53
				: m.clone().endOf('month').week()
		const calendar = Array(endWeek - startWeek + 1)
			.fill(0)
			.map((v, i) => startWeek + i)
		return (
			<>
				{calendar.map((v: any) => (
					<S.YearRow key={v}>
						{Array(7)
							.fill(0)
							.map((n, i) => {
								const current = m
									.clone()
									.week(v)
									.startOf('week')
									.add(n + i, 'day')
								const todaySelected =
									m.format('YYYYMMDD') === current.format('YYYYMMDD')
										? 'year-selected'
										: ''
								const isSelected =
									Number(nowDay) === Number(current.format('D')) &&
									Number(yearStorage) === nowYear &&
									nowWeek === v
										? 'yearSelected'
										: ''
								const isGrayed =
									current.format('MM') === m.format('MM') ? '' : 'year-grayed'
								const clicking =
									current.format('MM') === m.format('MM')
										? onClickDayInYear
										: (e: any) => e.preventDefault()
								const day = []
								if (current.format('MM') === m.format('MM')) {
									{
										storage.forEach((v: any) => {
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
											return ''
									}
								}
								return (
									<S.YearBox
										backgroundColor={color()}
										onClick={clicking}
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
					.map((v, i) => (
						<S.MonthWrapper id={i.toString()}>
							<S.MonthTitle>
								{m.add(i - 2, 'month').format('MMMM')}
							</S.MonthTitle>
							<S.YearRow>
								<S.YearDay>SUN</S.YearDay>
								<S.YearDay>MON</S.YearDay>
								<S.YearDay>TUE</S.YearDay>
								<S.YearDay>WED</S.YearDay>
								<S.YearDay>THU</S.YearDay>
								<S.YearDay>FRI</S.YearDay>
								<S.YearDay>SAT</S.YearDay>
							</S.YearRow>
							{Generate(nowYear, i)}
						</S.MonthWrapper>
					))}
			</>
		)
	}

	return (
		<S.YearComponent>
			<S.YearTitle>{nowYear}</S.YearTitle>
			{GenerateWrap()}
		</S.YearComponent>
	)
}
export default Year
