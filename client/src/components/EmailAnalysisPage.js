import React from 'react'
import { FlexBox, StyledChar, StyledCharContainer } from './sharedComponents/CommonStyles'
import { connect } from 'react-redux'
import { updateEmailLetterCount, toggleCountLettersForAllEmails } from '../actions/Actions'

const LetterCountPage = (props) => {
  const peopleToAnalyze = props.countLettersForAllEmails ? props.people.all : props.people.current
  const handleAnalyze = () => props.updateEmailLetterCount(peopleToAnalyze)

  const showAnalysis = Object.keys(props.letterCount).length > 0
  const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const sortedLetters = allLetters.sort((a, b) => (props.letterCount[b] || 0) - (props.letterCount[a] || 0))

  const letterCountContent = sortedLetters.map(char => (
    <StyledChar key={char}>
      {char}: {props.letterCount[char] || 0}
    </StyledChar>
  ))

  return (
    <FlexBox>
      {showAnalysis ?
        (<FlexBox>
          <h1>Char Counts</h1>
          <button onClick={handleAnalyze}>Update Analysis</button>
          <button onClick={props.toggleCountLettersForAllEmails}>
            {props.countLettersForAllEmails ? 'Analysis for This Page' : 'Analysis for All Email'}
          </button>
          <StyledCharContainer>
            {letterCountContent}
          </StyledCharContainer>
        </FlexBox>) :
        <button onClick={handleAnalyze}>Display Email Analysis</button>}
    </FlexBox>
  )
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    letterCount: state.emailAnalysis.letterCount,
    countLettersForAllEmails: state.emailAnalysis.countLettersForAllEmails
  }
}

const mapDispatchToProps = {
  updateEmailLetterCount,
  toggleCountLettersForAllEmails
}

export default connect(mapStateToProps, mapDispatchToProps)(LetterCountPage)