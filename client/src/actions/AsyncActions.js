import * as actions from './Actions'

export function fetchPeople(page = 0, per_page = 25) {
  return dispatch => {
    return fetch(`/api/people?page=${page}&per_page=${per_page}`)
      .then(response => response.json())
      .then(people => dispatch(actions.receivePeopleSuccess(people, page)))
      .catch((err) => dispatch(actions.receivePeopleFailure(err)))
  }
}