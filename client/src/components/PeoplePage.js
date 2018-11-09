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
      charCount: {},
      allChars: []
    }
  }

  async componentDidMount() {
    const response = await axios.get('/api/people')
    console.log(response.data)
    this.setState({ people: response.data })
  }

  render() {
    const countCharacters = () => {
      const charCount = this.state.people.reduce((charObject, person) => {
        return person.email_address.split('').reduce((charObject, char) => {
          charObject[char] ? charObject[char] += 1 : charObject[char] = 1
          return charObject
        }, charObject)
      }, {})

      const allChars = Object.keys(charCount)

      this.setState({ charCount, showCharCount: true, allChars })
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

    const charCountContent = !this.state.showCharCount ? null : (
      <div>
        <h1>Char Counts!</h1>
        {this.state.allChars.map(char => {
          return (
            <div>
              {char}: {this.state.charCount[char]}
            </div>
          )
        })}
      </div>
    )


    return (
      <PeoplePageWrapper>
        <h1>People Page</h1>
        <div>
          {this.state.page > 0 ? 'Go Back To Last Page | ' : null}
          Current Page: {this.state.page + 1} |
          Go To Next Page
        </div>

        <button onClick={countCharacters}>Update Char Count</button>
        {charCountContent}

        <StyledPeopleContainer>
          {peopleContent}
        </StyledPeopleContainer>
      </PeoplePageWrapper>
    )
  }
}


export default connect(null)(PeoplePage)