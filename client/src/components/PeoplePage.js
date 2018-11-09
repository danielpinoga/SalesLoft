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
      page: 0,
      showCharCount: false,
      charCount: {}
    }
  }

  async componentDidMount() {
    const response = await axios.get('/api/people')
    console.log(response.data)
    this.setState({ people: response.data })
  }

  countCharacters() {
    const count = this.state.people.reduce((charObject, person) => {
      console.log(person.email_address)
    }, {})

    console.log('final count', count)
  }

  render() {
    const countCharacters = () => {

    }


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
        <div>
          {this.state.page > 0 ? 'Go Back To Last Page | ' : null}
          Current Page: {this.state.page + 1} |
          Go To Next Page
        </div>

        <div>Char Count: {this.state.charCount.a}</div>
        <button onClick={this.countCharacters}>Update Char Count</button>

        <StyledPeopleContainer>
          {peopleContent}
        </StyledPeopleContainer>
      </PeoplePageWrapper>
    )
  }
}


export default connect(null)(PeoplePage)