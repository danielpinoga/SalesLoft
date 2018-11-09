import { RECEIVE_PEOPLE } from '../actions/Constants'

export function people(
  state = [],
  action
) {
  switch (action.type) {
    case RECEIVE_PEOPLE:
      return [...action.people]
    default:
      return state
  }
}