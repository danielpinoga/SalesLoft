import { determineUnshardedEmails, shardMultipleEmails, deepMergeShards } from '../utils'
import {
  RECEIVE_PEOPLE_SUCCESS,
  RECEIVE_PEOPLE_FAILURE,
  UPDATE_EMAIL_CHARS,
  TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS,
  UPDATE_EMAIL_SHARDS,
  UPDATE_PAGE,
  TOGGLE_CHECK_FOR_DUPES
} from '../actions/Constants'

const defaultState = {
  allPeople: {},
  currentPeople: {},
  page: 1,
  loading: false,
  checkForDupes: false,
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
      newState.currentPeople = {}
      newState.page = action.page

      const people = action.people.map(person => {
        return {
          id: person.id,
          title: person.title,
          display_name: person.display_name,
          email_address: person.email_address
        }
      })

      //convert array to object with ID as key (for easier searching)
      people.forEach(person => newState.allPeople[person.id] = person)
      people.forEach(person => newState.currentPeople[person.id] = person)

      newState.loading = false
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
      newState.emailShards = deepMergeShards(newState.emailShards, newShards)
      newState.emailsAlreadySharded = { ...newState.emailsAlreadySharded, ...emailsToBeSharded }
      return newState

    case UPDATE_PAGE:
      newState = { ...state }
      newState.page = action.page
      newState.loading = true
      return newState

    case TOGGLE_CHECK_FOR_DUPES:
      newState = { ...state }
      newState.checkForDupes = !state.checkForDupes
      return newState

    default:
      return state
  }
}

