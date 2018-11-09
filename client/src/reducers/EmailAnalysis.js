import { UPDATE_EMAIL_CHARS, TOOGLE_ANALYZE_ALL } from '../actions/Constants'

export function emailAnalysis(
  state = {
    results: {},
    analyzeAll: false
  },
  action
) {
  let newState = ''

  switch (action.type) {
    case TOOGLE_ANALYZE_ALL:
      newState = { ...state }
      newState.analyzeAll = !newState.analyzeAll
      return newState
    case UPDATE_EMAIL_CHARS:
      newState = { ...state }
      newState.results = action.results
      return newState
    default:
      return state
  }
}