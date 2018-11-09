import { RECEIVE_PEOPLE_SUCCESS, RECEIVE_PEOPLE_FAILURE } from '../actions/Constants'

export function people(
  state = [],
  action
) {
  switch (action.type) {
    case RECEIVE_PEOPLE_SUCCESS:
      return [...action.people]
    case RECEIVE_PEOPLE_FAILURE:
      console.error('Failure to get people from API.')
    default:
      return state
  }
}