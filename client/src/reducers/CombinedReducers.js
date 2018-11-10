import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'
import { peopleInfo } from './PeopleInfo'

const Reducers = combineReducers({
  router: routerReducer,
  me,
  peopleInfo
});

export default Reducers