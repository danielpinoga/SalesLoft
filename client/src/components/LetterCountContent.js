import React from 'react'
import { connect } from 'react-redux'
import CharacterView from './CharacterView'
import { FlexBox } from './Styles'
import styled from 'styled-components'
import { toggleCountLettersForAllEmails } from '../actions/Actions'


export const StyledCharContainer = styled(FlexBox)`
  flex-wrap: wrap;
  height: 20vh;
  width: 60vw;
  border: 2px black solid;
`

const LetterCountContent = ({ letterCount, countLettersForAllEmails, toggleCountLettersForAllEmails }) => {
  const buttonMessage = 'Track Letters On ' + (countLettersForAllEmails ? 'Only This Page' : 'All Loaded Pages')

  const sortedLetters = 'abcdefghijklmnopqrstuvwxyz'.split('').sort((a, b) => (letterCount[b] || 0) - (letterCount[a] || 0))
  const letterCountContent = sortedLetters.map(char => <CharacterView key={char} char={char} />)

  return (
    <FlexBox>
      <button onClick={toggleCountLettersForAllEmails}>{buttonMessage}</button>
      <StyledCharContainer>
        {letterCountContent}
      </StyledCharContainer>
    </FlexBox>
  )
}

const mapStateToProps = (state) => {
  return {
    letterCount: state.peopleInfo.letterCount,
    countLettersForAllEmails: state.peopleInfo.countLettersForAllEmails
  }
}

const mapDispatchToProps = {
  toggleCountLettersForAllEmails
}

export default connect(mapStateToProps, mapDispatchToProps)(LetterCountContent)