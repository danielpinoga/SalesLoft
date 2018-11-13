import React from 'react'
import { FlexBox, StyledChar, StyledCharContainer } from './Styles'
import { connect } from 'react-redux'
import { updateEmailLetterCount, toggleCountLettersForAllEmails } from '../actions/Actions'

const LetterCountView = ({
  countLettersForAllEmails,
  allPeople,
  currentPeople,
  letterCount,
  updateEmailLetterCount,
  toggleCountLettersForAllEmails
}) => {
  const peopleToAnalyze = countLettersForAllEmails ? allPeople : currentPeople
  const handleAnalyze = () => updateEmailLetterCount(peopleToAnalyze)

  const showAnalysis = Object.keys(letterCount).length > 0
  const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const sortedLetters = allLetters.sort((a, b) => (letterCount[b] || 0) - (letterCount[a] || 0))

  const letterCountContent = sortedLetters.map(char => (
    <StyledChar key={char}>
      {char}: {letterCount[char] || 0}
    </StyledChar>
  ))

  return (
    <FlexBox>
      {showAnalysis ?
        (<FlexBox>
          <h1>Char Counts</h1>
          <button onClick={handleAnalyze}>Update Email Letter Count</button>
          <button onClick={toggleCountLettersForAllEmails}>
            {countLettersForAllEmails ? 'Track Letters Only on This Page' : 'Track Letters on All Loaded Pages'}
          </button>
          <StyledCharContainer>
            {letterCountContent}
          </StyledCharContainer>
        </FlexBox>) :
        <button onClick={handleAnalyze}>Display Email Letter Count</button>}
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
  updateEmailLetterCount,
  toggleCountLettersForAllEmails
}

export default connect(mapStateToProps, mapDispatchToProps)(LetterCountView)