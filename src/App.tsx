import React from 'react'
import GlobalThemeProvider from './style/GlobalThemeProvider'
import Main from './pages/Main/Main'
// todo router be here

const App = () => {
	return (
		<GlobalThemeProvider>
			<Main />
		</GlobalThemeProvider>
	)
}

export default App
