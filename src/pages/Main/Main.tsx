import React, { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import Calendar from '../../component/organisms/Calendar/Calendar'
import Summary from '../../component/organisms/Summary/Summary'
import MainCalendar from '../../component/organisms/MainCalendar/MainCalendar'
import AddScheduler from '../../component/organisms/AddScheduler/AddScheduler'

import { storage, setItemsInStorage } from '../../stores/store'

import * as S from './style'

const Main: React.FunctionComponent = () => {
	const storageProps = useReactiveVar(storage)

	useEffect(() => {
		localStorage.setItem('storage', JSON.stringify(storageProps))
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
