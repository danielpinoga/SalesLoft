import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledPerson = styled(Link)`
  border: solid 2px black;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 350px;
  text-decoration: none;
`
const StyledPeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 2px 16px;

`


class PeoplePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    }
  }

  componentDidMount() {
    axios.get('/api/people')
      .then(response => {
        this.setState({ people: response.data })
      })
  }


  render() {
    const peopleContent = this.state.people.map(person => {
      return (
        <StyledPerson key={person.id} to={`/people/${person.id}`}>
          <div>Name: {person.first_name} {person.last_name}</div>
          <div>Email: {person.email_address}</div>
        </StyledPerson>
      )
    })

    return (
      <StyledPeopleContainer>
        People PAge
        {peopleContent}
      </StyledPeopleContainer>
    )
  }
}


export default connect(null)(PeoplePage)