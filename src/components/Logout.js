import React, { useState } from 'react'
import { useAuthDispatch } from '../Context'
import { axiosInstance } from '../App'

function Logout({ history }) {
	const authDispatch = useAuthDispatch()
	try {
		axiosInstance.post('/rest-auth/logout/').then(
			authDispatch({
				type: 'LOGOUT',
			})
		)
		history.goBack()
	} catch (error) {
		console.log(error)
	}
	return
}

export default Logout
