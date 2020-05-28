import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Main from './components/Main'
import About from './components/About'
import axios from 'axios'
function App() {
	const [posts, setPosts] = useState(null)
	axios
		.get('https://jsonplaceholder.typicode.com/posts')
		.then((res) => res.data)
		.then((data) => {
			setPosts(data)
			console.log(data)
		})
	return (
		<div className='app'>
			<Router>
				<Link to='/'>Main</Link> | <Link to='/About'>About</Link>
				<Route path='/About' component={About} />
				<Route exact path='/' component={Main} />
			</Router>
		</div>
	)
}

export default App
