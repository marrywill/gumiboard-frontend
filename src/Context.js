import React, { useReducer, createContext, useContext, useRef } from 'react'
import axios from 'axios'

const initialUsers = [{ id: 1, username: 'marrywill', password: '1234' }]
const initialArticles = []

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

function userReducer(state, action) {
	switch (action.type) {
		case 'USER_CREATE':
			console.log(action.user)
			// return state.concat(action.user)
			return axios.post('/user', action.user)
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

const UserStateContext = createContext()
const UserDispatchContext = createContext()
const UserNextIdContext = createContext()

const ArticleStateContext = createContext()
const ArticleDispatchContext = createContext()
const ArticleNextIdContext = createContext()

export function UserProvider({ children }) {
	const [state, dispatch] = useReducer(userReducer, initialUsers)
	const nextId = useRef(1)
	return (
		<UserStateContext.Provider value={state}>
			<UserDispatchContext.Provider value={dispatch}>
				<UserNextIdContext.Provider value={nextId}>{children}</UserNextIdContext.Provider>
			</UserDispatchContext.Provider>
		</UserStateContext.Provider>
	)
}

export function ArticleProvider({ children }) {
	const [state, dispatch] = useReducer(articleReducer, initialArticles)
	const nextId = useRef(2)
	return (
		<ArticleStateContext.Provider value={state}>
			<ArticleDispatchContext.Provider value={dispatch}>
				<ArticleNextIdContext.Provider value={nextId}>{children}</ArticleNextIdContext.Provider>
			</ArticleDispatchContext.Provider>
		</ArticleStateContext.Provider>
	)
}

export function useUserState() {
	return useContext(UserStateContext)
}

export function useUserDispatch() {
	return useContext(UserDispatchContext)
}

export function useUserNextId() {
	return useContext(UserNextIdContext)
}

export function useArticleState() {
	return useContext(ArticleStateContext)
}

export function useArticleDispatch() {
	return useContext(ArticleDispatchContext)
}

export function useArticleNextId() {
	return useContext(ArticleNextIdContext)
}
