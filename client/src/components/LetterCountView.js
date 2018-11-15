import React from 'react'
import { FlexBox } from './Styles'
import { connect } from 'react-redux'
import { updateEmailLetterCount, toggleCountLettersForAllEmails } from '../actions/Actions'
import CharacterView from './CharacterView';
import styled from 'styled-components'

export const StyledCharContainer = styled(FlexBox)`
  flex-wrap: wrap;
  height: 20vh;
  width: 60vw;
  border: 2px black solid;
`

const LetterCountView = ({
  countLettersForAllEmails,
  allPeople,
  currentPeople,
  letterCount,
  updateEmailLetterCount,
  toggleCountLettersForAllEmails
}) => {
  const letterCountExists = Object.keys(letterCount).length > 0
  const peopleToAnalyze = countLettersForAllEmails ? allPeople : currentPeople
  const sortedLetters = 'abcdefghijklmnopqrstuvwxyz'.split('').sort((a, b) => (letterCount[b] || 0) - (letterCount[a] || 0))

  const handleAnalyze = () => updateEmailLetterCount(peopleToAnalyze)
  const letterCountContent = sortedLetters.map(char => (
    <CharacterView key={char} char={char} />
  ))

  const buttonMessage = 'Track Letters On ' + (countLettersForAllEmails ? 'Only This Page' : 'All Loaded Pages')

  return (
    <FlexBox>
      <button onClick={handleAnalyze}>Update Email Letter Count</button>
      {letterCountExists ? (
        <FlexBox>
          <button onClick={toggleCountLettersForAllEmails}>{buttonMessage}</button>
          <StyledCharContainer>
            {letterCountContent}
          </StyledCharContainer>
        </FlexBox>
      ) : null}
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