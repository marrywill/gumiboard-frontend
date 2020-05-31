import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { UserProvider, ArticleProvider } from './Context'

ReactDOM.render(
	<UserProvider>
		<ArticleProvider>
			<App />
		</ArticleProvider>
	</UserProvider>,
	document.getElementById('root')
)
