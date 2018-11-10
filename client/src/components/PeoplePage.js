import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import EmailAnalysisPage from './EmailAnalysisPage'
import { fetchPeople } from '../actions/AsyncActions'
import { updateEmailShards } from '../actions/Actions'
import { PeoplePageWrapper } from './sharedComponents/CommonStyles'

const StyledPeopleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

const StyledPerson = styled.div`
  border: solid 2px black;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 350px;
  text-decoration: none;
  margin: 10px;
  padding: 15px;
`

class PeoplePage extends Component {
  state = {
    page: 1
  }

  async componentDidMount() {
    await this.props.fetchPeople(this.state.page)
    this.props.updateEmailShards()
  }

  goNext = () => {
    const nextPage = this.state.page + 1
    this.props.fetchPeople(nextPage)
    this.setState({ page: nextPage })
    this.props.updateEmailShards()
  }

  goBack = () => {
    const lastPage = this.state.page - 1
    this.props.fetchPeople(lastPage)
    this.setState({ page: lastPage })
  }

  render() {
    let peopleContent = Object.keys(this.props.currentPeople).map(key => {
      const person = this.props.currentPeople[key]
      return (
        <StyledPerson key={key} to={`/people/${person.id}`}>
          <div>Name: {person.first_name} {person.last_name}</div>
          <div>Email: {person.email_address}</div>
          <div>Job Title: {person.title}</div>
        </StyledPerson>
      )
    })

    const pageNavigation = (
      <div>
        {this.state.page > 1 ? <span onClick={this.goBack}>Back One Page | </span> : <span >On First Page | </span>}
        Current Page: {this.state.page} |
        <span onClick={this.goNext}> Next Page</span>
      </div>
    )

    return (
      <PeoplePageWrapper>
        <h1>People Page</h1>
        {pageNavigation}

        <EmailAnalysisPage />

        <StyledPeopleContainer>
          {peopleContent}
        </StyledPeopleContainer>
      </PeoplePageWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allPeople: state.peopleInfo.allPeople,
    currentPeople: state.peopleInfo.currentPeople
  }
}

const mapDispatchToProps = {
  fetchPeople,
  updateEmailShards
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)