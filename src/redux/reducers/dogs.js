import axios from 'axios'

let initialState = {
    dogs: [],
    loading: false,
    selected: null
}

const GET_DOGS = 'GET_DOGS'
const GET_DOG = 'GET_DOG'
const UPDATE_DOG = 'UPDATE_DOG'

export default function (state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case GET_DOGS + '_PENDING':
            return { ...state, loading: true }
        case GET_DOGS + '_FULFILLED':
            return { ...state, loading: false, dogs: payload.data }
        case GET_DOG + '_PENDING':
            return { ...state, loading: true }
        case GET_DOG + '_FULFILLED':
            return { ...state, loading: false, selected: payload.data }
        case UPDATE_DOG + '_PENDING':
            return { ...state, loading: true }
        case UPDATE_DOG + '_FULFILLED':
            return { ...state, loading: false, dogs: payload.data}
        default:
            return state
    }
}

export function getDogs() {
    return {
        type: GET_DOGS,
        payload: axios.get('/api/dogs')
    }
}

export function getDog(id) {
    return {
        type: GET_DOG,
        payload: axios.get(`/api/dogs/${id}`)
    }
}

export function updateDog(updatedDog) {
    console.log(updatedDog)
    return {
        type: UPDATE_DOG,
        payload: axios.put(`/api/dogs`, updatedDog)
    }
}