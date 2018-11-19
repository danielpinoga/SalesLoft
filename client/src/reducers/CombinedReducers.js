import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { peopleInfo } from './PeopleInfo'
import { emailInfo } from './EmailInfo'

const Reducers = combineReducers({
  router: routerReducer,
  peopleInfo,
  emailInfo
})

export default Reducers