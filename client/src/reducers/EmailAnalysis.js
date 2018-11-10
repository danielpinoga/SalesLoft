import { UPDATE_EMAIL_CHARS, TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS } from '../actions/Constants'

export function emailAnalysis(
  state = {
    letterCount: {},
    countLettersForAllEmails: false,

  },
  action
) {
  let newState = ''

  switch (action.type) {
    case TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS:
      newState = { ...state }
      newState.countLettersForAllEmails = !newState.countLettersForAllEmails
      return newState
    case UPDATE_EMAIL_CHARS:
      newState = { ...state }
      newState.letterCount = action.letterCount
      return newState
    default:
      return state
  }
}