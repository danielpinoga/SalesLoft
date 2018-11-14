import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PersonCard from './PersonCard'
import { checkForDupeLogic } from '../utils'

const StyledPeopleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

const PeopleList = ({ loading, emailShards, currentPeople, checkForDupes }) => {
  const peopleContent = Object.keys(currentPeople).map(key => {
    const person = currentPeople[key]
    //TODO - put dupeResults in store (a re-render rechecks dupes)
    const dupeResults = checkForDupes ? checkForDupeLogic(person.email_address, emailShards) : {}

    return <PersonCard key={key} person={person} dupeResults={dupeResults} />
  })

  return (
    <StyledPeopleContainer>
      {loading ? <img src='/loading.gif' alt='loading' /> : peopleContent}
    </StyledPeopleContainer>
  )
}


const mapStateToProps = (state) => {
  return {
    currentPeople: state.peopleInfo.currentPeople,
    emailShards: state.peopleInfo.emailShards,
    loading: state.peopleInfo.loading,
    checkForDupes: state.peopleInfo.checkForDupes
  }
}

export default connect(mapStateToProps)(PeopleList)