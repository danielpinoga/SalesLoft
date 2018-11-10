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

export function toggleAnalyzeAll() {
  return {
    type: actions.TOOGLE_ANALYZE_ALL
  }
}

const breakEmailIntoSubStrings = (email, subLength, subStrings = {}) => {
  for (let i = 0; i < email.length - subLength + 1; i++) {
    const subString = email.substr(i, subLength)
    if (!subStrings[subString]) subStrings[subString] = { [email]: 0 }
    subStrings[subString][email] ? subStrings[subString][email] += 1 : subStrings[subString][email] = 1
  }
  return subStrings
}

export function breakAllEmailsIntoSubStrings(allEmails) {
  const maxEmailLength = Math.max(...allEmails.map(email => email.length))
  const allEmailAnalysis = {}
  for (let i = 0; i <= maxEmailLength; i++) {
    const analysis = allEmails.reduce((tracker, email) => {
      return breakEmailIntoSubStrings(email, i, tracker)
    }, {})
    allEmailAnalysis[i] = analysis
  }
  return {
    type: actions.ADD_ALL_EMAIL_SUBSTRINGS,
    allEmailAnalysis
  }
}