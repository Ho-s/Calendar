import React from 'react'
import moment from 'moment'
import * as S from './style'

interface IYear {
  nowDay: number;
  nowWeek: number;
  yearStorage: number;
  storage: any;
  nowYear: number;
  onClickDayInYear: () => void;
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
	const today = m.format('YYYYMMDD')

	const Generate = (year: any, month: any) => {
		m.set('year', year)
		m.set('month', month)
		const startWeek = m.clone().startOf('month').week()
		const endWeek =
      m.clone().endOf('month').week() === 1
      	? 53
      	: m.clone().endOf('month').week()
		const calendar = []
		for (let week = startWeek; week <= endWeek; week++) {
			calendar.push(
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
                Number(nowDay) === Number(current.format('D')) &&
                Number(yearStorage) === nowYear &&
                nowWeek === week
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
							const zero = day.length === 0 ? '' : ''
							const one = day.length === 1 ? 'rgb(229, 255, 0)' : ''
							const two = day.length === 2 ? 'rgb(255, 238, 0)' : ''
							const three = day.length === 3 ? 'rgb(255, 204, 0)' : ''
							const four = day.length === 4 ? 'rgb(255, 170, 0)' : ''
							const five = day.length >= 5 ? 'rgb(255, 106, 0)' : ''
							const color = `${zero}${one}${two}${three}${four}${five}`
							return (
								<S.YearBox
									onClick={clicking}
									style={{ backgroundColor: color }}
									className={`${todaySelected} ${isGrayed} ${isSelected}`}
									key={i}
								>
									{current.format('D')}
								</S.YearBox>
							)
						})}
				</S.YearRow>
			)
		}
		return calendar
	}

	const GenerateWrap = () => {
		return (
			<>
				{Array(12)
					.fill(0)
					.map((v, i) => (
						<div
							id={i.toString()}
							style={{
								marginRight: '10px',
								height: '28vh',
								float: 'left',
								marginTop: '20px',
							}}
						>
							<div style={{ fontWeight: 600, marginBottom: '5px' }}>
								{m.add(i - 2, 'month').format('MMMM')}
							</div>
							<S.YearRow>
								<S.YearDay>
									<span>SUN</span>
								</S.YearDay>
								<S.YearDay>
									<span>MON</span>
								</S.YearDay>
								<S.YearDay>
									<span>TUE</span>
								</S.YearDay>
								<S.YearDay>
									<span>WED</span>
								</S.YearDay>
								<S.YearDay>
									<span>THU</span>
								</S.YearDay>
								<S.YearDay>
									<span>FRI</span>
								</S.YearDay>
								<S.YearDay>
									<span>SAT</span>
								</S.YearDay>
							</S.YearRow>
							{Generate(nowYear, i)}
						</div>
					))}
			</>
		)
	}

	return (
		<S.YearComponent>
			<div style={{ color: 'red', fontSize: '30px' }}>{nowYear}</div>
			{GenerateWrap()}
		</S.YearComponent>
	)
}
export default Year
