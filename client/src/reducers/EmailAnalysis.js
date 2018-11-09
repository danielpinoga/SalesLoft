import { merge } from '../utils'
import { UPDATE_EMAIL_CHARS } from '../actions/Constants'
import { bindActionCreators } from 'redux';

export function emailAnalysis(
  state = {},
  action
) {
  switch (action.type) {
    case UPDATE_EMAIL_CHARS:
      return merge(state, action.emailChars)
    default:
      return state
  }
}