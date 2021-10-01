import React from 'react'
import { Link } from 'react-router-dom'
import { useReactiveVar } from '@apollo/client'

import Calendar from '../../molecules/Calendar/Calendar'
import Summary from '../../molecules/Summary/Summary'
import AddScheduler from '../../molecules/AddScheduler/AddScheduler'

import { navBarClicked, onClickHamburger } from '../../../stores/store'

import * as S from './style'

const Lefter: React.FunctionComponent = () => {
	const navBarClickedProps = useReactiveVar(navBarClicked)

	return(
		<S.LeftBar clicked={navBarClickedProps}>
			<S.TitleWrapper clicked={navBarClickedProps}>
				<S.LinkWrapper>
					<Link to='/'>
						<S.Logo />
						<S.Title>Calendar</S.Title>
					</Link>
				</S.LinkWrapper>
				<S.Hamburger onClick={onClickHamburger} clicked={navBarClickedProps}>
					<S.HamburgerBars />
					<S.HamburgerBars />
					<S.HamburgerBars />
				</S.Hamburger>
			</S.TitleWrapper>
			<AddScheduler />
			<Calendar />
			<Summary />
		</S.LeftBar>
	)
}

export default Lefter
