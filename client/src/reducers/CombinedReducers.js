import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'
import { people } from './People'
import { chars } from './CharCount'

const Reducers = combineReducers({
  router: routerReducer,
  me,
  people,
  chars
});

export default Reducers