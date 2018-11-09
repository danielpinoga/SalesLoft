import React from 'react'
import styled from 'styled-components'
import { FlexBox, Box } from './sharedComponents/CommonStyles'
import { connect } from 'react-redux'
import { updateEmailChars, toggleAnalyzeAll } from '../actions/Actions'

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
    const peopleArray = props.analyzeAll ? props.people.all : props.people.current
    const allEmailChars = peopleArray.reduce((charTracker, person) => {
      return person.email_address.split('').reduce((charTracker, char) => {
        if (char.match(/[a-z]/i)) {
          charTracker[char] ? charTracker[char] += 1 : charTracker[char] = 1
        }
        return charTracker
      }, charTracker)
    }, {})

    props.updateEmailChars(allEmailChars, true)
  }

  const toggleAnalysis = () => {
    props.toggleAnalyzeAll()
    analyzeEmails()
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

  const analysisContent = showAnalysis ?
    (
      <FlexBox>
        <h1>Char Counts</h1>
        <button onClick={analyzeEmails}>Update Analysis for this page</button>
        <button onClick={toggleAnalysis}>Toggle Analysis between ALL and CURRENT PAGE</button>
        <StyledCharContainer>
          {emailAnalysis}
        </StyledCharContainer>
      </FlexBox>
    ) : (
      <button onClick={analyzeEmails}>Display Email Analysis</button>
    )

  return (
    <FlexBox>
      {analysisContent}
    </FlexBox>
  )
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    emailAnalysis: state.emailAnalysis.results,
    analyzeAll: state.emailAnalysis.analyzeAll,
    page: state.people.page
  }
}

const mapDispatchToProps = {
  updateEmailChars,
  toggleAnalyzeAll
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailAnalysis)