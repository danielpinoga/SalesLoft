import { RECEIVE_PEOPLE_SUCCESS, RECEIVE_PEOPLE_FAILURE } from '../actions/Constants'

export function people(
  state = {
    all: [],
    current: [],
    page: 1
  },
  action
) {
  switch (action.type) {
    case RECEIVE_PEOPLE_SUCCESS:
      const newState = { ...state }
      // newState.all.push(...action.people)
      newState.current = [...action.people]
      return newState
    case RECEIVE_PEOPLE_FAILURE:
      console.error('Failure to get people from API.')
    default:
      return state
  }
}