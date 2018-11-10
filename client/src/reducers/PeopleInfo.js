import {
  RECEIVE_PEOPLE_SUCCESS,
  RECEIVE_PEOPLE_FAILURE,
  UPDATE_EMAIL_CHARS,
  TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS,
  UPDATE_EMAIL_SHARDS
} from '../actions/Constants'

const defaultState = {
  allPeople: {},
  currentPeople: {},
  page: 1,
  letterCount: {},
  countLettersForAllEmails: false,
  emailShards: {},
  emailsAlreadySharded: {}
}

export function peopleInfo(state = defaultState, action) {
  let newState = {}

  switch (action.type) {
    case RECEIVE_PEOPLE_SUCCESS:
      newState = { ...state }
      action.people.forEach(person => newState.allPeople[person.id] = person
      )
      newState.currentPeople = {}
      action.people.forEach(person => newState.currentPeople[person.id] = person)

      newState.page = action.page
      return newState

    case RECEIVE_PEOPLE_FAILURE:
      console.error('Failure to get people from API.')
      return state

    case TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS:
      newState = { ...state }
      newState.countLettersForAllEmails = !newState.countLettersForAllEmails
      return newState

    case UPDATE_EMAIL_CHARS:
      newState = { ...state }
      newState.letterCount = action.letterCount
      return newState

    case UPDATE_EMAIL_SHARDS:
      const emailsToBeSharded = determineUnshardedEmails(state.allPeople, state.emailsAlreadySharded)
      const newShards = shardMultipleEmails(emailsToBeSharded)

      newState = { ...state }
      newState.emailShards = newShards //NEED TO MERGE WITH EXISTING SHARDS
      newState.emailsAlreadySharded = { ...newState.emailsAlreadySharded, ...emailsToBeSharded }
      return newState
    default:
      return state
  }
}

const createEmailShards = (email, shardLength, shards = {}) => {
  for (let i = 0; i < email.length - shardLength + 1; i++) {
    const shard = email.substr(i, shardLength)
    if (!shards[shard]) shards[shard] = { [email]: 0 }
    shards[shard][email] ? shards[shard][email] += 1 : shards[shard][email] = 1
  }
  return shards
}

const shardMultipleEmails = (emails) => {
  const emailArray = Object.keys(emails)
  const maxEmailLength = Math.max(...emailArray.map(email => email.length))
  const allShards = {}
  for (let shardLength = 0; shardLength <= maxEmailLength; shardLength++) {
    allShards[shardLength] = emailArray.reduce((shards, email) => createEmailShards(email, shardLength, shards), {})
  }
  return allShards
}

const determineUnshardedEmails = (allPeople, shardedEmails) => {
  const emailsToBeSharded = {}
  const allEmails = Object.keys(allPeople).map(id => allPeople[id].email_address)
  const filteredEmails = allEmails.filter(email => !shardedEmails[email])
  filteredEmails.forEach(email => emailsToBeSharded[email] = true)
  return emailsToBeSharded
}