import * as actions from './Constants'
import { countLettersInEmails } from '../utils'

export const receivePeopleSuccess = (people, page) => ({ type: actions.RECEIVE_PEOPLE_SUCCESS, people, page })

export const receivePeopleFailure = (err) => ({ type: actions.RECEIVE_PEOPLE_FAILURE, err })

export function updateEmailLetterCount(peopleArray) {
  const letterCount = countLettersInEmails(peopleArray)
  return {
    type: actions.UPDATE_EMAIL_CHARS,
    letterCount
  }
}

export const toggleCountLettersForAllEmails = () => ({ type: actions.TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS })

export const updateEmailShards = () => ({ type: actions.UPDATE_EMAIL_SHARDS })

export const updatePage = (page) => ({ type: actions.UPDATE_PAGE, page })