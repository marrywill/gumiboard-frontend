import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { UserProvider, ArticleProvider, AuthProvider } from './Context'

ReactDOM.render(
	<AuthProvider>
		<UserProvider>
			<ArticleProvider>
				<App />
			</ArticleProvider>
		</UserProvider>
	</AuthProvider>,
	document.getElementById('root')
)
