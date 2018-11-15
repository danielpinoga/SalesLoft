import { determineUnshardedEmails, shardMultipleEmails, deepMergeShards } from '../utils'
import {
  RECEIVE_PEOPLE_SUCCESS,
  RECEIVE_PEOPLE_FAILURE,
  SET_CURRENT_PEOPLE,
  UPDATE_EMAIL_CHARS,
  TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS,
  UPDATE_EMAIL_SHARDS,
  UPDATE_PAGE,
  TOGGLE_CHECK_FOR_DUPES
} from '../actions/Constants'

const defaultState = {
  allPeople: {},
  allPeopleByPageSize: {},
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
  let newState = { ...state }
  const { page, pageSize, people } = action

  switch (action.type) {
    case RECEIVE_PEOPLE_SUCCESS:
      newState.currentPeople = {}

      const mappedPeople = people.map(person => {
        return {
          id: person.id,
          title: person.title,
          display_name: person.display_name,
          email_address: person.email_address
        }
      })

      //convert array to object with ID as key (for easier searching)
      const newPeople = {}
      mappedPeople.forEach(person => newPeople[person.id] = person)

      newState.currentPeople = newPeople
      newState.allPeople = { ...newState.allPeople, ...newPeople }

      if (!newState.allPeopleByPageSize[pageSize]) newState.allPeopleByPageSize[pageSize] = {}
      newState.allPeopleByPageSize[pageSize][page] = newPeople

      newState.loading = false
      return newState

    case RECEIVE_PEOPLE_FAILURE:
      console.error('Failure to get people from API.', action.err)
      return state

    case SET_CURRENT_PEOPLE:
      newState.currentPeople = state.allPeopleByPageSize[pageSize][page]
      newState.loading = false
      return newState

    case TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS:
      newState.countLettersForAllEmails = !newState.countLettersForAllEmails
      return newState

    case UPDATE_EMAIL_CHARS:
      newState.letterCount = action.letterCount
      return newState

    case UPDATE_EMAIL_SHARDS:
      const emailsToBeSharded = determineUnshardedEmails(state.allPeople, state.emailsAlreadySharded)
      const newShards = shardMultipleEmails(emailsToBeSharded)

      newState.emailShards = deepMergeShards(newState.emailShards, newShards)
      newState.emailsAlreadySharded = { ...newState.emailsAlreadySharded, ...emailsToBeSharded }
      return newState

    case UPDATE_PAGE:
      newState.page = page
      newState.loading = true
      return newState

    case TOGGLE_CHECK_FOR_DUPES:
      newState.checkForDupes = !state.checkForDupes
      return newState

    default:
      return state
  }
}

