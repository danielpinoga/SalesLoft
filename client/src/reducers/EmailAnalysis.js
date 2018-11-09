import { merge } from '../utils'
import { UPDATE_EMAIL_CHARS } from '../actions/Constants'
import { bindActionCreators } from 'redux';

export function emailAnalysis(
  state = {
    chars: {},
    showChars: false
  },
  action
) {
  switch (action.type) {
    case UPDATE_EMAIL_CHARS:
      const updates = {
        chars: action.emailChars,
        showChars: action.showChars
      }
      return merge(state, updates)
    default:
      return state
  }
}