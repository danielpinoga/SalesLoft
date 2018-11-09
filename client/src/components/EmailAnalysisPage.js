import React from 'react'
import { FlexBox, Box } from './sharedComponents/CommonStyles'
import { connect } from 'react-redux'
import { updateEmailChars, toggleAnalyzeAll } from '../actions/Actions'
import styled from 'styled-components'

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

const EmailAnalysisPage = (props) => {
  const showAnalysis = Object.keys(props.emailAnalysis).length > 0
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const peopleToAnalyze = props.analyzeAll ? props.people.all : props.people.current
  const handleAnalyze = () => props.updateEmailChars(peopleToAnalyze)

  const allCharsSorted = letters.toLowerCase().split('').sort((charA, charB) => {
    return (props.emailAnalysis[charB] || 0) - (props.emailAnalysis[charA] || 0)
  })

  const emailAnalysis = allCharsSorted.map(char => (
    <StyledChar key={char}>
      {char}: {props.emailAnalysis[char] || 0}
    </StyledChar>
  ))

  return (
    <FlexBox>
      {showAnalysis ?
        (<FlexBox>
          <h1>Char Counts</h1>
          <button onClick={handleAnalyze}>Update Analysis</button>
          <button onClick={props.toggleAnalyzeAll}>
            {props.analyzeAll ? 'Analysis for This Page' : 'Analysis for All Email'}
          </button>
          <StyledCharContainer>
            {emailAnalysis}
          </StyledCharContainer>
        </FlexBox>) :
        <button onClick={handleAnalyze}>Display Email Analysis</button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(EmailAnalysisPage)