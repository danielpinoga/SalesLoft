import { UPDATE_EMAIL_CHARS, TOOGLE_ANALYZE_ALL } from '../actions/Constants'

export function emailAnalysis(
  state = {
    letterCount: {},
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
      newState.letterCount = action.letterCount
      return newState
    default:
      return state
  }
}