import * as actions from './Constants'

export function receiveMe(me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}

export function receivePeopleSuccess(people, page) {
  return {
    type: actions.RECEIVE_PEOPLE_SUCCESS,
    people,
    page
  }
}

export function receivePeopleFailure(err) {
  return {
    type: actions.RECEIVE_PEOPLE_FAILURE,
    err
  }
}

export function updateEmailChars(results) {
  return {
    type: actions.UPDATE_EMAIL_CHARS,
    results
  }
}

export function toggleAnalyzeAll() {
  return {
    type: actions.TOOGLE_ANALYZE_ALL
  }
}