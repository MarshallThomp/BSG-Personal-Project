import axios from 'axios'

const initialState = {
    data: null
}

const GET_USER = 'GET_USER'
const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export default function (state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case GET_USER + '_FULFILLED':
            return { ...state, data: payload.data }
        case LOGIN_USER + '_FULFILLED':
            return { ...state, data: payload.data }
        case LOGOUT_USER + '_FULFILLED':
            return { ...state, data: null }
        default: 
            return state
    }
}

export function getUser() {
    return {
        type: GET_USER,
        payload: axios.get('/auth/currentUser')
    }
}

export function login(loginInfo) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', loginInfo)
    }
}

export function logout() {
    return {
        type: LOGOUT_USER,
        payload: axios.get('/auth/logout')
    }
}