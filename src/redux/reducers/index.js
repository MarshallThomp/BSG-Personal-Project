import { combineReducers } from 'redux'

import user from './users'
import dogs from './dogs'

export default combineReducers({ user, dogs })