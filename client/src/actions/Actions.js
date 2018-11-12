import * as actions from './Constants'

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

export function updateEmailLetterCount(peopleArray) {
  const letterCount = Object.keys(peopleArray).reduce((charTracker, id) => {
    return peopleArray[id].email_address.split('').reduce((charTracker, char) => {
      if (char.match(/[a-z]/i)) {
        charTracker[char] ? charTracker[char] += 1 : charTracker[char] = 1
      }
      return charTracker
    }, charTracker)
  }, {})

  return {
    type: actions.UPDATE_EMAIL_CHARS,
    letterCount
  }
}

export function toggleCountLettersForAllEmails() {
  return {
    type: actions.TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS
  }
}

export function updateEmailShards() {
  return {
    type: actions.UPDATE_EMAIL_SHARDS
  }
}