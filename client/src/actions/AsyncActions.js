import * as actions from './Actions'

export const creds = { credentials: 'same-origin' };

export function fetchMe() {
  return dispatch => {
    return fetch('/api/me.json', creds).
      then(response => response.json()).
      then(me => dispatch(actions.receiveMe(me)));
  }
}

export function fetchPeople(page = 0, per_page = 25) {
  return dispatch => {
    return fetch(`/api/people?page=${page}&per_page=${per_page}`)
      .then(response => response.json())
      .then(people => dispatch(actions.receivePeopleSuccess(people)))
      .catch((err) => dispatch(actions.receivePeopleFailure(err)))
  }
}