import React from 'react'
import GlobalThemeProvider from './style/GlobalThemeProvider'
import Main from './pages/Main/Main'

const App = () => (
	<GlobalThemeProvider>
		<Main />
	</GlobalThemeProvider>
)

export default App
