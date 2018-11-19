import React from 'react'
import { connect } from 'react-redux'
import PersonCard from './PersonCard'
import { StyledCardContainer } from './Styles'


const PeopleList = ({ loading, currentPeople }) => {
  const peopleContent = Object.keys(currentPeople).map(key => {
    const person = currentPeople[key]
    return <PersonCard key={key} person={person} />
  })

  return (
    <StyledCardContainer>
      {loading ? <img src='/loading.gif' alt='loading' /> : peopleContent}
    </StyledCardContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    currentPeople: state.peopleInfo.currentPeople,
    loading: state.peopleInfo.loading,
  }
}

export default connect(mapStateToProps)(PeopleList)