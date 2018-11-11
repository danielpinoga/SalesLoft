import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LetterCountView from './LetterCountView'
import { fetchPeople } from '../actions/AsyncActions'
import { updateEmailShards } from '../actions/Actions'
import { PeoplePageWrapper, FlexBox } from './sharedComponents/CommonStyles'
import { shardSingleEmail } from '../utils';

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
    page: 1,
    checkForDupes: false,
    emailInput: ''
  }

  async componentDidMount() {
    await this.props.fetchPeople(this.state.page)
    this.props.updateEmailShards()
  }

  changePage = async (direction) => {
    this.setState({ loading: true })
    const nextPage = (direction === 'next') ? this.state.page + 1 : this.state.page - 1
    await this.props.fetchPeople(nextPage)
    this.setState({ page: nextPage, checkForDupes: false, loading: false })
    this.props.updateEmailShards()
  }

  checkForDupes = () => {
    this.setState({ checkForDupes: true })
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
    let peopleContent = Object.keys(this.props.currentPeople).map(key => {
      const person = this.props.currentPeople[key]
      let dupeResults = {}
      if (this.state.checkForDupes) {
        dupeResults = checkForDupeLogic(person.email_address, this.props.emailShards) //STORE THIS IN THE STORE (render rechecks)
      }
      return (
        <StyledPerson key={key} to={`/people/${person.id}`}>
          <div>Name: {person.first_name} {person.last_name}</div>
          <div>Email: {person.email_address}</div>
          <div>Job Title: {person.title}</div>
          {this.state.checkForDupes ? (
            <div>
              <div>Best Dupe: {dupeResults.bestDupe}</div>
              <div>Points: {dupeResults.points}</div>
            </div>
          ) : null}
        </StyledPerson>
      )
    })

    const pageNavigation = (
      <div>
        {this.state.page > 1 ? <span onClick={() => this.changePage('back')}>Back One Page | </span> : <span >On First Page | </span>}
        Current Page: {this.state.page} |
        <span onClick={() => this.changePage('next')}> Next Page</span>
      </div>
    )



    return (
      <PeoplePageWrapper>
        <h1>People Page</h1>
        {pageNavigation}
        <LetterCountView />

        <FlexBox>
          <h3>Dupe Tester</h3>
          <input name='emailInput' onChange={this.handleChange} value={this.state.emailInput} />
          <div>
            <div>Best Dupe: {this.state.bestDupe}</div>
            <div>Confidence: {this.state.points}</div>
          </div>
        </FlexBox>
        <button onClick={this.checkForDupes}>Check For Dupes</button>
        <StyledPeopleContainer>
          {this.state.loading ? <img src='/loading.gif' alt='loading' /> : peopleContent}
        </StyledPeopleContainer>
      </PeoplePageWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allPeople: state.peopleInfo.allPeople,
    currentPeople: state.peopleInfo.currentPeople,
    emailShards: state.peopleInfo.emailShards
  }
}

const mapDispatchToProps = {
  fetchPeople,
  updateEmailShards
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)



const breakEmailIntoSubStrings = (email, subLength, subStrings = {}) => {
  for (let i = 0; i < email.length - subLength + 1; i++) {
    const subString = email.substr(i, subLength)
    if (!subStrings[subString]) subStrings[subString] = { [email]: 0 }
    subStrings[subString][email] ? subStrings[subString][email] += 1 : subStrings[subString][email] = 1
  }
  return subStrings
}

const subLengthFactor = (subLength) => {
  return subLength * 10
}

/*
Find all substrings within the given email and count their frequency
Iterate through the substrings found in step 1
  If the current substring is in the tracking object
    Iterate through all emails that also contain that substring
      update the potentialMatch tracking object for that email
        add the minimum count between (matches in email) and (matches in new email)
        multiply by the subLength factor
*/
const checkNewEmail = (newEmail, subLength, allEmailAnalysis) => {
  const dupeTracker = {}
  const newEmailAnalysis = breakEmailIntoSubStrings(newEmail, subLength)
  const allFoundSubstrings = Object.keys(newEmailAnalysis)
  allFoundSubstrings.forEach(subString => {
    if (allEmailAnalysis[subString]) {
      const emailsWithSubString = Object.keys(allEmailAnalysis[subString])
      emailsWithSubString.forEach(email => {
        const hitsInAllEmails = allEmailAnalysis[subString][email]
        const hitsInNewEmail = newEmailAnalysis[subString][newEmail]
        const points = Math.min(hitsInAllEmails, hitsInNewEmail) * subLengthFactor(subLength)
        if (dupeTracker[email]) dupeTracker[email] += points
        else dupeTracker[email] = points
      })
    }
  })
  return dupeTracker
}

const checkForDupeLogic = (newEmail, allEmailShards) => {
  const dupeCheckResults = {}
  for (let i = 1; i < newEmail.length; i++) {
    const allEmailAnalysis = allEmailShards[i]
    if (!allEmailAnalysis) continue
    const newEmailAnalysis = checkNewEmail(newEmail, i, allEmailAnalysis)
    Object.keys(newEmailAnalysis).reduce((finalAnalysis, matchedEmail) => {
      if (finalAnalysis[matchedEmail]) {
        finalAnalysis[matchedEmail] += newEmailAnalysis[matchedEmail]
      } else {
        finalAnalysis[matchedEmail] = newEmailAnalysis[matchedEmail]
      }
      return finalAnalysis
    }, dupeCheckResults)
  }
  const sortedDupeCheckResults = Object.keys(dupeCheckResults).sort((a, b) => dupeCheckResults[b] - dupeCheckResults[a])

  if (sortedDupeCheckResults[0] === newEmail) sortedDupeCheckResults.shift()
  const bestDupe = sortedDupeCheckResults[0]
  const points = dupeCheckResults[bestDupe]
  return { bestDupe, points }
}