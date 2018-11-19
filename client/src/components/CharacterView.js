import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

export const StyledChar = styled.div`
  margin: 2px 10px;
`

const CharacterView = ({ char, letterCount }) => {
  return (
    <StyledChar key={char}>
      {char}: {letterCount[char] || 0}
    </StyledChar>
  )
}

const mapStateToProps = (state) => {
  return {
    letterCount: state.emailInfo.letterCount
  }
}
export default connect(mapStateToProps)(CharacterView)