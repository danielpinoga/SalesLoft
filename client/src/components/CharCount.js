import React from 'react'
import styled from 'styled-components'

const CharCountPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

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

const CharCount = (props) => {
  const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  const allCharsSorted = allChars.toLowerCase().split('').sort((charA, charB) => {
    return (props.charCount[charB] || 0) - (props.charCount[charA] || 0)
  })

  const charCountContent = allCharsSorted.map(char => {
    return (
      <StyledChar key={char}>
        {char}: {props.charCount[char] || 0}
      </StyledChar>
    )
  })

  return (
    <CharCountPageWrapper>
      <h1>Char Counts!</h1>
      <StyledCharContainer>
        {charCountContent}
      </StyledCharContainer>
    </CharCountPageWrapper>
  )
}

export default CharCount