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
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


  const countCharacters = () => {
    const emailChars = props.people.reduce((charObject, person) => {
      return person.email_address.split('').reduce((charObject, char) => {
        if (char.match(/[a-z]/i)) {
          charObject[char] ? charObject[char] += 1 : charObject[char] = 1
        }
        return charObject
      }, charObject)
    }, {})

    props.updateEmailChars(emailChars, true)
  }

  let emailAnalysis = ''

  if (props.showAnalysis) {
    const allCharsSorted = allChars.toLowerCase().split('').sort((charA, charB) => {
      return (props.emailChars[charB] || 0) - (props.emailChars[charA] || 0)
    })

    emailAnalysis = allCharsSorted.map(char => {
      return (
        <StyledChar key={char}>
          {char}: {props.emailChars[char] || 0}
        </StyledChar>
      )
    })
  }


  return (
    <FlexBox>
      <button onClick={countCharacters}>Count</button>
      {props.showAnalysis ? (
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
    emailChars: state.emailAnalysis.chars,
    showAnalysis: state.emailAnalysis.showAnalysis
  }
}

const mapDispatchToProps = {
  updateEmailChars
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailAnalysis)