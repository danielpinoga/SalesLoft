import React, { Component } from 'react'
import { connect } from 'react-redux'
import LetterCountView from './LetterCountView'
import { fetchPeople } from '../actions/AsyncActions'
import { updateEmailShards } from '../actions/Actions'
import { PeoplePageWrapper } from './Styles'
import { shardSingleEmail } from '../utils'
import DupeChecker from './DupeChecker';
import PageNavigation from './PageNavigation';
import PeopleList from './PeopleList';


class PeoplePage extends Component {
  state = {
    checkForDupes: false,
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
    return (
      <PeoplePageWrapper>
        <h1>SalesLoft Integration</h1>

        <PageNavigation />
        <LetterCountView />
        <DupeChecker handleChange={this.handleChange} emailImput={this.state.emailInput} bestDupe={this.state.bestDupe} points={this.state.points} />

        <button onClick={this.checkForDupes}>Check For Dupes</button>

        <PeopleList loading={this.state.loading} checkForDupes={this.state.checkForDupes} checkForDupeLogic={checkForDupeLogic} />
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
  updateEmailShards
}

export default connect(mapStateToProps, mapDispatchToProps)(PeoplePage)






// BELOW LOGIC TO BE REFACTORED AND MOVED


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