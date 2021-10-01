import React, { useEffect } from 'react'
import { useMutation, useQuery, useReactiveVar } from '@apollo/client'

import Header from '../../component/organisms/Header/Header'
import Lefter from '../../component/organisms/Lefter/Lefter'
import { CREATE_SCHEDULE } from '../../graphql/mutation'

import { storage, setItemsInStorage } from '../../stores/store'

import * as S from './style'

interface BaseTemplateProps {
	children: React.ReactNode
}

const BaseTemplate: React.FunctionComponent<BaseTemplateProps> = ({children}) => {
	const storageProps = useReactiveVar(storage)
	const [createSchedule]= useMutation(CREATE_SCHEDULE)

	const onClick = async() => {
		const input = {
			title:'good',
			year: 2013,
			month: 9,
			day: 13,
			startHours: 9,
			startMinutes: 23,
			endHours: 24,
			endMinutes: 25,
			color:'#e9e9e9'
		}
		await createSchedule({
			variables:{
				input
			}
		})
	}

	useEffect(() => {
		localStorage.setItem('storage', JSON.stringify(storageProps))
	}, [storageProps])

	useEffect(() => {
		setItemsInStorage()
	}, [])

	return (
		<S.Main>
			<S.MainLeft>
				<Lefter />
			</S.MainLeft>
			<S.MainRight>
				<Header />
				<div onClick={onClick}>hIWO</div>
				{children}
			</S.MainRight>
		</S.Main>
	)
}
export default BaseTemplate
