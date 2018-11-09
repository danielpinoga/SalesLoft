import { RECEIVE_PEOPLE_SUCCESS, RECEIVE_PEOPLE_FAILURE } from '../actions/Constants'

export function people(
  state = {
    all: {},
    current: {},
    page: 1
  },
  action
) {
  switch (action.type) {
    case RECEIVE_PEOPLE_SUCCESS:
      const newState = { ...state }
      action.people.forEach(person => {
        newState.all[person.id] = person
      })
      newState.current = {}
      action.people.forEach(person => {
        newState.current[person.id] = person
      })
      newState.page = action.page
      return newState
    case RECEIVE_PEOPLE_FAILURE:
      console.error('Failure to get people from API.')
    default:
      return state
  }
}