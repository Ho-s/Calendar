import React, {useEffect,useState} from 'react'
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Day from './pages/Day/Day'
import Week from './pages/Week/Week'
import Month from './pages/Month/Month'
import Year from './pages/Year/Year'
import GlobalThemeProvider from './style/GlobalThemeProvider'

const App = () => {
	const m = moment()

	const [location, setLocation] = useState<number>(m.hours() * 61 + m.minutes())
	const [lineTime, setLineTime] = useState<string>(m.format('LT'))

	useEffect(()=>{
		const timer = setInterval(()=>{
			setLineTime(m.format('LT') + '')
			setLocation(m.hours() * 61 + m.minutes())
		}, 1000)
		return () => clearInterval(timer)
	},[location])

	return(
		<GlobalThemeProvider>
		<Router>
			<Switch>
				<Route render={(props)=><Day {...props} location={location} lineTime={lineTime}/>} exact path='/'/>
				<Route render={(props)=><Week {...props} location={location} lineTime={lineTime}/>} exact path='/week'/>
				<Route exact path='/month' component={Month}/>
				<Route exact path='/year' component={Year}/>
			</Switch>
		</Router>
	</GlobalThemeProvider>
	)
}

export default App
