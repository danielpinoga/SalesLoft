import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { peopleInfo } from './PeopleInfo'

const Reducers = combineReducers({
  router: routerReducer,
  peopleInfo
})

export default Reducers