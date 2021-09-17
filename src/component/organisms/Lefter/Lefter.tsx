import React from 'react'

import Calendar from '../../molcules/Calendar/Calendar'
import Summary from '../../molcules/Summary/Summary'
import AddScheduler from '../../molcules/AddScheduler/AddScheduler'

import * as S from './style'

const Lefter: React.FunctionComponent = () => (
		<>
            <AddScheduler />
            <Calendar />
            <Summary />
		</>
	)
export default Lefter
