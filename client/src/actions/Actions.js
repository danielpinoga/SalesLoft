import * as actions from './Constants'

export function receiveMe(me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}

export function receivePeopleSuccess(people) {
  return {
    type: actions.RECEIVE_PEOPLE_SUCCESS,
    people
  }
}

export function receivePeopleFailure(err) {
  return {
    type: actions.RECEIVE_PEOPLE_FAILURE,
    err
  }
}

export function updateEmailChars(emailChars) {
  return {
    type: actions.UPDATE_EMAIL_CHARS,
    emailChars
  }
}