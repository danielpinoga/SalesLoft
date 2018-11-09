import * as actions from './Constants'

export function receiveMe(me) {
  return {
    type: actions.RECEIVE_ME,
    me
  }
}

export function receivePeople(people) {
  return {
    type: actions.RECEIVE_PEOPLE,
    people
  }
}

export function updateEmailChars(emailChars, showAnalysis) {
  return {
    type: actions.UPDATE_EMAIL_CHARS,
    emailChars,
    showAnalysis
  }
}