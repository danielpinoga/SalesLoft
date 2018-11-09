import React from 'react'

const CharCount = (props) => {

  const charCountContent = props.allChars.map(char => {
    return (
      <div key={char}>
        {char}: {props.charCount[char]}
      </div>
    )
  })

  return (
    <div>
      <h1>Char Counts!</h1>
      {charCountContent}
    </div>
  )
}

export default CharCount