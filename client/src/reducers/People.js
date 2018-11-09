import { merge } from '../utils'
import { RECEIVE_PEOPLE } from '../actions/Constants'

export function people(
  state = {},
  action
) {
  switch (action.type) {
    case RECEIVE_PEOPLE:
      return merge(state, action.people)
    default:
      return state
  }
}