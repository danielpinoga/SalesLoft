import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import EmailAnalysisPage from './EmailAnalysisPage'
import { fetchPeople } from '../actions/AsyncActions'

const PeoplePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledPerson = styled.div`
  border: solid 2px black;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 350px;
  text-decoration: none;
  margin: 10px;
  padding: 15px;
`
const StyledPeopleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

class PeoplePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    }
  }

  async componentDidMount() {
    this.props.fetchPeople(this.state.page)
  }

  render() {
    console.log(Object.keys(this.props.people.all).length)
    const goNext = () => {
      const nextPage = this.state.page + 1
      this.props.fetchPeople(nextPage)
      this.setState({ page: nextPage })
    }

    const goBack = () => {
      const lastPage = this.state.page - 1
      this.props.fetchPeople(lastPage)
      this.setState({ page: lastPage })
    }

    let peopleContent = Object.keys(this.props.people.current).map(id => {
      const person = this.props.people.current[id]
      return (
        <StyledPerson key={person.id} to={`/people/${person.id}`}>
          <div>Name: {person.first_name} {person.last_name}</div>
          <div>Email: {person.email_address}</div>
          <div>Job Title: {person.title}</div>
        </StyledPerson>
      )
    })

    const backButton = this.state.page > 1 ?
      <span onClick={goBack}>Back One Page | </span> :
      null

    return (
      <PeoplePageWrapper>
        <h1>People Page</h1>
        <div>
          {backButton}
          Current Page: {this.state.page} |
          <span onClick={goNext}> Next Page</span>
        </div>

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
    people: state.people
  }
}

const mapDispatchToProps = {
  fetchPeople
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)