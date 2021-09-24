import React, { useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'

import Header from '../../component/organisms/Header/Header'
import Lefter from '../../component/organisms/Lefter/Lefter'

import { storage, setItemsInStorage } from '../../stores/store'

import * as S from './style'

interface BaseTemplateProps {
	children: React.ReactNode
}

const BaseTemplate: React.FunctionComponent<BaseTemplateProps> = ({children}) => {
	const storageProps = useReactiveVar(storage)

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
				{children}
			</S.MainRight>
		</S.Main>
	)
}
export default BaseTemplate
