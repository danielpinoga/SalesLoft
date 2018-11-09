import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import { me } from './Me'
import { people } from './People'
import { emailAnalysis } from './EmailAnalysis'

const Reducers = combineReducers({
  router: routerReducer,
  me,
  people,
  emailAnalysis
});

export default Reducers