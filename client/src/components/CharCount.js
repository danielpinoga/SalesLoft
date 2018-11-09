import React from 'react'

const CharCount = (props) => {

  const allCharsSorted = props.allChars.sort((charA, charB) => {
    return props.charCount[charB] - props.charCount[charA]
  })

  const charCountContent = allCharsSorted.map(char => {
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