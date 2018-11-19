import React from 'react'
import { FlexBox } from './Styles'
import { connect } from 'react-redux'
import { updateEmailLetterCount } from '../actions/Actions'
import LetterCountContent from './LetterCountContent'

const LetterContainer = ({ countLettersForAllEmails, allPeople, currentPeople, letterCount, updateEmailLetterCount }) => {

  const handleAnalyze = () => {
    const peopleToAnalyze = countLettersForAllEmails ? allPeople : currentPeople
    const newLetterCount = countLettersInEmails(peopleToAnalyze)
    updateEmailLetterCount(newLetterCount)
  }
  const letterCountExists = Object.keys(letterCount).length > 0

  return (
    <FlexBox>
      <button onClick={handleAnalyze}>Update Email Letter Count</button>
      {letterCountExists ? <LetterCountContent /> : null}
    </FlexBox>
  )
}

const countLettersInEmails = (peopleArray) => {
  return Object.keys(peopleArray).reduce((letterCount, id) => {
    return peopleArray[id].email_address.split('').reduce((letterCount, char) => {
      letterCount[char] ? letterCount[char] += 1 : letterCount[char] = 1
      return letterCount
    }, letterCount)
  }, {})
}

const mapStateToProps = (state) => {
  return {
    allPeople: state.peopleInfo.allPeople,
    currentPeople: state.peopleInfo.currentPeople,
    letterCount: state.emailInfo.letterCount,
    countLettersForAllEmails: state.emailInfo.countLettersForAllEmails
  }
}

const mapDispatchToProps = {
  updateEmailLetterCount
}

export default connect(mapStateToProps, mapDispatchToProps)(LetterContainer)