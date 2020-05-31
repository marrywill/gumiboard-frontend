import React, { useReducer, createContext, useContext } from 'react'

const initialUsers = []
const initialArticles = []
const initialAuth = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: false,
	user: null,
}

/* 
 User
- CREATE
- UPDATE
- REMOVE

 Article
- CREATE
- TOGGLE(like)
- REMOVE
- UPDATE

 COMMENT
- CREATE
- REMOVE
- REMOVE
*/

async function userReducer(state, action) {
	switch (action.type) {
		case 'USER_CREATE':
			return state.concat(action.user)

		case 'USER_UPDATE':
			return state.map((user) => (user.id === action.id ? { ...user, ...action.user } : user))
		// return axios.put(`/user/${action.id}`, {
		// 	username: action.user.username,
		// 	password: action.user.password,
		// })
		case 'USER_REMOVE':
			return state.filter((user) => user.id !== action.id)
		// return axios.delete(`/user/${action.id}`)
		// case 'USER_READ':
		// 	return axios.get(`/user/${action.id}`)
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

function articleReducer(state, action) {
	switch (action.type) {
		case 'ARTICLE_CREATE':
			return state.concat(action.article)
		case 'ARTICLE_UPDATE':
			return state.map((article) => (article.id === action.id ? { ...action.article } : article))
		case 'ARTICLE_REMOVE':
			return state.filter((article) => article.id !== action.id)
		default:
			throw new Error(`Unhandled action type: ${action.type}`)
	}
}

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			localStorage.setItem('token', action.token)
			return {
				...state,
				token: action.token,
				isAuthenticated: true,
				loading: false,
			}
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				isAuthenticated: false,
				loading: true,
			}
		case 'SIGNUP_FAIL':
		case 'LOGIN_FAIL':
		case 'LOGOUT':
			localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			}
		default:
			return state
	}
}

const UserStateContext = createContext()
const UserDispatchContext = createContext()

const ArticleStateContext = createContext()
const ArticleDispatchContext = createContext()

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

export function UserProvider({ children }) {
	const [state, dispatch] = useReducer(userReducer, initialUsers)
	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	)
}

export function ArticleProvider({ children }) {
	const [state, dispatch] = useReducer(articleReducer, initialArticles)
	return (
		<ArticleStateContext.Provider value={state}>
			<ArticleDispatchContext.Provider value={dispatch}>{children}</ArticleDispatchContext.Provider>
		</ArticleStateContext.Provider>
	)
}

export function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(authReducer, initialAuth)
	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	)
}

export function useUserState() {
	return useContext(UserStateContext)
}

export function useUserDispatch() {
	return useContext(UserDispatchContext)
}

export function useArticleState() {
	return useContext(ArticleStateContext)
}

export function useArticleDispatch() {
	return useContext(ArticleDispatchContext)
}

export function useAuthState() {
	return useContext(AuthStateContext)
}

export function useAuthDispatch() {
	return useContext(AuthDispatchContext)
}
