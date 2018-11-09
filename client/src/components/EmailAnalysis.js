import React from 'react'
import styled from 'styled-components'
import { FlexBox, Box } from './sharedComponents/CommonStyles'
import { connect } from 'react-redux'
import { updateEmailChars } from '../actions/Actions'

const StyledCharContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  height: 20vh;
  width: 60vw;
  border: 2px black solid;
`

const StyledChar = styled.div`
  margin: 2px 10px;
`

const EmailAnalysis = (props) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const showAnalysis = Object.keys(props.emailAnalysis).length > 0

  const analyzeEmails = () => {
    const allEmailChars = props.people.reduce((charTracker, person) => {
      return person.email_address.split('').reduce((charTracker, char) => {
        if (char.match(/[a-z]/i)) {
          charTracker[char] ? charTracker[char] += 1 : charTracker[char] = 1
        }
        return charTracker
      }, charTracker)
    }, {})

    props.updateEmailChars(allEmailChars, true)
  }

  const allCharsSorted = letters.toLowerCase().split('').sort((charA, charB) => {
    return (props.emailAnalysis[charB] || 0) - (props.emailAnalysis[charA] || 0)
  })

  const emailAnalysis = allCharsSorted.map(char => {
    return (
      <StyledChar key={char}>
        {char}: {props.emailAnalysis[char] || 0}
      </StyledChar>
    )
  })

  return (
    <FlexBox>
      <button onClick={analyzeEmails}>Display Email Analysis</button>
      {showAnalysis ? (
        <FlexBox>
          <h1>Char Counts!</h1>
          <StyledCharContainer>
            {emailAnalysis}
          </StyledCharContainer>
        </FlexBox>
      ) : null}
    </FlexBox>
  )
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    emailAnalysis: state.emailAnalysis
  }
}

const mapDispatchToProps = {
  updateEmailChars
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailAnalysis)