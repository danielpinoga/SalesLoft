import {
  UPDATE_EMAIL_CHARS,
  TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS
} from '../actions/Constants'

const defaultState = {
  letterCount: {},
  countLettersForAllEmails: false,
}

export function emailInfo(state = defaultState, action) {
  let newState = { ...state }

  switch (action.type) {
    case TOGGLE_COUNT_LETTERS_FOR_ALL_EMAILS:
      newState.countLettersForAllEmails = !newState.countLettersForAllEmails
      return newState

    case UPDATE_EMAIL_CHARS:
      newState.letterCount = action.letterCount
      return newState

    default:
      return state
  }
}

