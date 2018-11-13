import React from 'react'
import { FlexBox } from './Styles'

const DupeChecker = ({ handleChange, emailInput, bestDupe, points }) => (
  <FlexBox>
    <h3>Dupe Tester</h3>
    <input name='emailInput' onChange={handleChange} value={emailInput} />
    <div>
      <div>Best Dupe: {bestDupe}</div>
      <div>Confidence: {points}</div>
    </div>
  </FlexBox>
)

export default DupeChecker