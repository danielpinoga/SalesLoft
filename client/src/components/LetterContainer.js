import React from 'react'
import { FlexBox } from './Styles'
import { connect } from 'react-redux'
import { updateEmailLetterCount } from '../actions/Actions'
import LetterCountContent from './LetterCountContent'

const LetterContainer = ({
  countLettersForAllEmails,
  allPeople,
  currentPeople,
  letterCount,
  updateEmailLetterCount
}) => {
  const peopleToAnalyze = countLettersForAllEmails ? allPeople : currentPeople
  const handleAnalyze = () => updateEmailLetterCount(peopleToAnalyze)

  const letterCountExists = Object.keys(letterCount).length > 0

  return (
    <FlexBox>
      <button onClick={handleAnalyze}>Update Email Letter Count</button>
      {letterCountExists ? <LetterCountContent /> : null}
    </FlexBox>
  )
}

const mapStateToProps = (state) => {
  return {
    allPeople: state.peopleInfo.allPeople,
    currentPeople: state.peopleInfo.currentPeople,
    letterCount: state.peopleInfo.letterCount,
    countLettersForAllEmails: state.peopleInfo.countLettersForAllEmails
  }
}

const mapDispatchToProps = {
  updateEmailLetterCount
}

export default connect(mapStateToProps, mapDispatchToProps)(LetterContainer)