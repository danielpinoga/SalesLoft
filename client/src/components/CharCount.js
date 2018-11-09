import React, { Component } from 'react'

export default class CharCount extends Component {
  render() {

    const allChars = this.props.allChars

    const charCountContent = allChars.map(char => {
      return (
        <div key={char}>
          {char}: {this.props.charCount[char]}
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
}
