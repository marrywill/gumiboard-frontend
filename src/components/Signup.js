import React, { useState } from 'react'
import { useUserDispatch, useAuthDispatch } from '../Context'
import { axiosInstance } from '../App'

function Signup() {
	const userDispatch = useUserDispatch()
	const authDispatch = useAuthDispatch()
	const [inputs, setInputs] = useState({
		username: '',
		password1: '',
		password2: '',
	})
	const { username, password1, password2 } = inputs

	const onChange = (e) => {
		const { name, value } = e.target

		setInputs({
			...inputs,
			[name]: value,
		})
	}

	const onReset = () => {
		setInputs({
			username: '',
			password1: '',
			password2: '',
		})
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		if (password1 !== password2) {
			setInputs({
				username: '',
				password1: '',
				password2: '',
			})
			return alert('비밀번호가 일치하지 않습니다')
		}

		try {
			const res = await axiosInstance.post('/rest-auth/registration/', inputs)
			userDispatch({
				type: 'USER_CREATE',
				user: {
					user: res.data.user,
				},
			})
			authDispatch({
				type: 'SIGNUP_SUCCESS',
				token: res.data.token,
			})
			setInputs({
				username: '',
				password1: '',
				password2: '',
			})
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<input name='username' placeholder='유저네임' onChange={onChange} value={username} />
			<input
				name='password1'
				type='password'
				placeholder='비밀번호'
				onChange={onChange}
				value={password1}
			/>
			<input
				name='password2'
				type='password'
				placeholder='비밀번호확인'
				onChange={onChange}
				value={password2}
			/>
			<button onClick={onReset}>초기화</button>
			<button onClick={onSubmit}>제출</button>
		</>
	)
}

export default Signup
