import React, { Component } from 'react'
import { connect } from 'react-redux'
import LetterCountView from './LetterCountView'
import { fetchPeople } from '../actions/AsyncActions'
import { updateEmailShards, toggleCheckForDupes } from '../actions/Actions'
import { PeoplePageWrapper } from './Styles'
import { shardSingleEmail, checkForDupeLogic } from '../utils'
import DupeChecker from './DupeChecker';
import PageNavigation from './PageNavigation';
import PeopleList from './PeopleList';


class PeoplePage extends Component {
  state = {
    emailInput: ''
  }

  async componentDidMount() {
    await this.fetchPeopleAndUpdateShards()
  }

  async componentDidUpdate() {
    await this.fetchPeopleAndUpdateShards()
  }

  async fetchPeopleAndUpdateShards() {
    await this.props.fetchPeople(this.props.page)
    this.props.updateEmailShards()
  }

  handleChange = (event) => {
    const emailAddress = event.target.value
    const dupeResults = checkForDupeLogic(emailAddress, this.props.emailShards)

    const newState = { ...this.state }
    newState[event.target.name] = emailAddress
    newState.bestDupe = dupeResults.bestDupe
    newState.points = dupeResults.points
    this.setState(newState)
  }

  render() {
    return (
      <PeoplePageWrapper>
        <h1>SalesLoft Integration</h1>

        <PageNavigation />
        <LetterCountView />
        <button onClick={this.props.toggleCheckForDupes}>Toggle Check For Dupes</button>

        <DupeChecker handleChange={this.handleChange} emailImput={this.state.emailInput} bestDupe={this.state.bestDupe} points={this.state.points} />

        <PeopleList />
      </PeoplePageWrapper>
    )
  }
}

const mapStateToProps = ({ peopleInfo }) => {
  return {
    allPeople: peopleInfo.allPeople,
    emailShards: peopleInfo.emailShards,
    page: peopleInfo.page
  }
}

const mapDispatchToProps = {
  fetchPeople,
  updateEmailShards,
  toggleCheckForDupes
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)