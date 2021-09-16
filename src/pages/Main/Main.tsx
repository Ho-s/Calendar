import React, { useEffect } from 'react'
import Calendar from '../../component/organisms/Calendar/Calendar'
import Summary from '../../component/organisms/Summary/Summary'
import MainCalendar from '../../component/organisms/MainCalendar/MainCalendar'
import AddScheduler from '../../component/organisms/AddScheduler/AddScheduler'
import * as S from './style'
import { storage, nowDay, nowWeek, setItemsInStorage } from '../../stores/store'
import { useReactiveVar } from '@apollo/client'

const Main: React.FunctionComponent = () => {
	const storageProps = useReactiveVar(storage)
	const nowDayProps = useReactiveVar(nowDay)
	const nowWeekProps = useReactiveVar(nowWeek)
	useEffect(() => {
		localStorage.setItem('storageProps', JSON.stringify(storageProps))
	}, [storageProps])

	useEffect(() => {
		setItemsInStorage()
	}, [])

	return (
		<>
			<S.MainLeft>
				<AddScheduler />
				<Calendar />
				<Summary />
			</S.MainLeft>
			<S.MainRight>
				<MainCalendar />
			</S.MainRight>
		</>
	)
}
export default Main
