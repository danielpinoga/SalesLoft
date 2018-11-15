import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlexBox } from './Styles'
import { checkForDupeLogic } from '../utils'

class DupeChecker extends Component {
  state = {
    emailInput: '',
    dupeResults: {
      bestDupe: '',
      points: 0
    }
  }

  handleChange = (event) => {
    const dupeResults = checkForDupeLogic(event.target.value, this.props.emailShards)

    const newState = { ...this.state }
    newState[event.target.name] = event.target.value
    newState.dupeResults = dupeResults
    this.setState(newState)
  }

  render() {
    const { bestDupe, points } = this.state.dupeResults

    return (
      <FlexBox>
        <h3>Dupe Tester</h3>
        <input
          name='emailInput'
          onChange={this.handleChange}
          value={this.state.emailInput} />
        <div>
          <div>Best Dupe: {bestDupe}</div>
          <div>Confidence: {points}</div>
        </div>
      </FlexBox>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    emailShards: state.peopleInfo.emailShards
  }
}

export default connect(mapStateToProps)(DupeChecker)