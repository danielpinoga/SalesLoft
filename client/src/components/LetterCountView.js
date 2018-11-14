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
  const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const letterCountExists = Object.keys(letterCount).length > 0
  const peopleToAnalyze = countLettersForAllEmails ? allPeople : currentPeople
  const sortedLetters = allLetters.sort((a, b) => (letterCount[b] || 0) - (letterCount[a] || 0))

  const handleAnalyze = () => updateEmailLetterCount(peopleToAnalyze)

  const letterCountContent = sortedLetters.map(char => (
    <StyledChar key={char}>
      {char}: {letterCount[char] || 0}
    </StyledChar>
  ))

  const trackingButton = (
    <button onClick={toggleCountLettersForAllEmails}>
      {countLettersForAllEmails ? 'Track Letters Only on This Page' : 'Track Letters on All Loaded Pages'}
    </button>
  )

  return (
    <FlexBox>
      <button onClick={handleAnalyze}>Update Email Letter Count</button>
      {letterCountExists ? (
        <FlexBox>
          {trackingButton}
          <StyledCharContainer>
            {letterCountContent}
          </StyledCharContainer>
        </FlexBox>
      ) : null}
    </FlexBox >
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