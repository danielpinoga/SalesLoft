import React, { Component } from 'react'
import { connect } from 'react-redux'
import LetterContainer from './LetterContainer'
import { fetchPeople } from '../actions/AsyncActions'
import { FlexBox } from './Styles'
import PageNavigation from './PageNavigation'
import PeopleList from './PeopleList'


class PeoplePage extends Component {

  async componentDidMount() {
    await this.props.fetchPeople(this.props.page)
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
  fetchPeople
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)