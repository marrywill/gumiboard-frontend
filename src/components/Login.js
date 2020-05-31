import React, { useState } from 'react'
import { useAuthDispatch } from '../Context'
import { axiosInstance } from '../App'

function Login({ location, history }) {
	const authDispatch = useAuthDispatch()
	const [inputs, setInputs] = useState({
		username: '',
		password: '',
	})
	const { username, password } = inputs

	const onChange = (e) => {
		const { name, value } = e.target

		setInputs({
			...inputs,
			[name]: value,
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await axiosInstance.post('/rest-auth/login/', inputs)
			authDispatch({
				type: 'LOGIN_SUCCESS',
				token: res.data.token,
			})
			setInputs({
				username: '',
				password: '',
			})
			history.goBack()
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<input name='username' placeholder='유저네임' onChange={onChange} value={username} />
			<input
				name='password'
				type='password'
				placeholder='비밀번호'
				onChange={onChange}
				value={password}
			/>
			<button onClick={onSubmit}>제출</button>
		</>
	)
}

export default Login
