import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Main from './components/Main'
import Signup from './components/Signup'
import axios from 'axios'
import Login from './components/Login'
import { useAuthState } from './Context'
import Logout from './components/Logout'

export const axiosInstance = axios.create({
	baseURL: 'http://127.0.0.1:8000/v1',
	headers: { 'Content-Type': 'application/json' },
})
function App() {
	const authState = useAuthState()
	const { isAuthenticated, loading } = authState
	// const [articles, setArticles] = useState([])
	// const res = await axiosInstance.get('/posts/')
	// setArticles(res)

	// const [posts, setPosts] = useState(null)
	// axios
	// 	.get('https://jsonplaceholder.typicode.com/posts)
	// 	.then((res) => res.data)
	// 	.then((data) => {
	// 		setPosts(data)
	// 		console.log(data)
	// 	})
	if (loading) {
		return '로딩중'
	}
	return (
		<div className='App'>
			<Router>
				<Link to='/'>
					<span>SSAFY</span>
				</Link>
				<Link to='/signup'>회원가입</Link>
				{isAuthenticated ? <Link to='/logout'>로그아웃</Link> : <Link to='/login'>로그인</Link>}
				{/* <Link to='/login'>로그인</Link> | <Link to='/signup'>회원가입</Link> */}
				<Switch>
					<Route exact path='/' component={Main} />
					<Route path='/signup' component={Signup} />
					<Route path='/login' component={Login} />
					<Route path='/logout' component={Logout} />
				</Switch>
			</Router>
			{/* <p>{isAuthenticated}</p> */}
			{/* {posts?.map((post) => (
					<div key={post.id}>{post.title}</div>
				))} */}
		</div>
	)
}

export default App
