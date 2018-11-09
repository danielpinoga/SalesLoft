import React from 'react'
import { FlexBox, StyledChar, StyledCharContainer } from './sharedComponents/CommonStyles'
import { connect } from 'react-redux'
import { updateEmailChars, toggleAnalyzeAll } from '../actions/Actions'

const EmailAnalysisPage = (props) => {
  const peopleToAnalyze = props.analyzeAll ? props.people.all : props.people.current
  const handleAnalyze = () => props.updateEmailChars(peopleToAnalyze)

  const showAnalysis = Object.keys(props.emailAnalysis).length > 0
  const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const sortedLetters = allLetters.sort((a, b) => (props.emailAnalysis[b] || 0) - (props.emailAnalysis[a] || 0))

  const emailAnalysisContent = sortedLetters.map(char => (
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
            {emailAnalysisContent}
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
    analyzeAll: state.emailAnalysis.analyzeAll
  }
}

const mapDispatchToProps = {
  updateEmailChars,
  toggleAnalyzeAll
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailAnalysisPage)