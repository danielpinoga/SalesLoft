import React, { Component } from 'react'
import { connect } from 'react-redux'
import LetterContainer from './LetterContainer'
import { fetchPeople } from '../actions/AsyncActions'
import { updateEmailShards } from '../actions/Actions'
import { FlexBox } from './Styles'
import PageNavigation from './PageNavigation'
import PeopleList from './PeopleList'


class PeoplePage extends Component {

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

  render() {
    return (
      <FlexBox>
        <h1>SalesLoft Integration</h1>

        <PageNavigation />
        <LetterContainer />
        <PeopleList />
      </FlexBox>
    )
  }
}

const mapStateToProps = ({ peopleInfo }) => {
  return {
    page: peopleInfo.page
  }
}

const mapDispatchToProps = {
  fetchPeople,
  updateEmailShards
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)