import React from 'react'
import { FlexBox } from './Styles'

const DupeChecker = (props) => (
  <FlexBox>
    <h3>Dupe Tester</h3>
    <input name='emailInput' onChange={props.handleChange} value={props.emailInput} />
    <div>
      <div>Best Dupe: {props.bestDupe}</div>
      <div>Confidence: {props.points}</div>
    </div>
  </FlexBox>
)

export default DupeChecker