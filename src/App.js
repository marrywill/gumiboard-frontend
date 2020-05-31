import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Main from './components/Main'
import Signup from './components/Signup'
function App() {
	// const [posts, setPosts] = useState(null)
	// axios
	// 	.get('https://jsonplaceholder.typicode.com/posts')
	// 	.then((res) => res.data)
	// 	.then((data) => {
	// 		setPosts(data)
	// 		console.log(data)
	// 	})

	return (
		<div className='App'>
			<Router>
				<Link to='/'>
					<span>SSAFY</span>
				</Link>
				<Link to='/'>로그인</Link> | <Link to='/signup'>회원가입</Link>
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/signup' component={Signup} />
				</Switch>
			</Router>
			{/* {posts?.map((post) => (
					<div key={post.id}>{post.title}</div>
				))} */}
		</div>
	)
}

export default App
