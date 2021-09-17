import React, { useState, useEffect } from 'react'
import moment from 'moment'

import {
	onClickToday,
} from '../../../stores/store'
import { BriefItemType } from 'types/type'

import * as S from './style'
import { Link, useHistory } from 'react-router-dom'


const Header: React.FunctionComponent = () => {
	const m = moment()
	const history = useHistory()

	const [timeDetail, setTimeDetail] = useState<string>(m.format('HH:mm:ss'))
	const [path, setPath] =useState<string>('')

	useEffect(()=>{
		const timer = setInterval(()=>{
			setTimeDetail(m.format('HH:mm:ss') + '')
		}, 1000)
		return () => clearInterval(timer)
	},[timeDetail])

	useEffect(()=>{
		setPath(history.location.pathname)
	},[])

	const BriefItem = ({cl, to, text, onClick}:BriefItemType):JSX.Element => (
		<S.linkWrapper onClick={onClick}>
			<Link className={cl} to={to}>
				{text}
			</Link>
		</S.linkWrapper>
	)

	return (
		<S.MainCalendarHead>
			<BriefItem cl={path==='/' ? 'clicked' : ''} to='/' text='Today' onClick={onClickToday}/>
			<S.MainCalendarHeadMid>
				<BriefItem cl={path === '/' ? 'clicked' : ''} to='/' text = 'Day'/>
				<BriefItem cl={path === '/week' ? 'clicked' : ''} to='/week' text = 'Week'/>
				<BriefItem cl={path === '/month' ? 'clicked' : ''} to='/month' text = 'Month'/>
				<BriefItem cl={path === '/year' ? 'clicked' : ''} to='/year' text = 'Year'/>
			</S.MainCalendarHeadMid>
			<S.Time>{timeDetail}</S.Time>
		</S.MainCalendarHead>
	)
}
export default Header
