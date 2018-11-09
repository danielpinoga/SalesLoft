import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PeoplePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledPerson = styled(Link)`
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
      people: [],
      page: 0
    }
  }

  componentDidMount() {
    axios.get('/api/people')
      .then(response => {
        console.log(response.data)
        this.setState({ people: response.data })
      })
  }


  render() {
    const peopleContent = this.state.people.map(person => {
      return (
        <StyledPerson key={person.id} to={`/people/${person.id}`}>
          <div>Name: {person.first_name} {person.last_name}</div>
          <div>Email: {person.email_address}</div>
          <div>Job Title: {person.title}</div>
        </StyledPerson>
      )
    })

    return (
      <PeoplePageWrapper>
        <h1>People Page</h1>
        {this.state.page > -1 ? 'Go Back To Last Page' : null} |
        Current Page: {this.state.page + 1} |
        Go To Next Page

        <StyledPeopleContainer>
          {peopleContent}
        </StyledPeopleContainer>
      </PeoplePageWrapper>
    )
  }
}


export default connect(null)(PeoplePage)