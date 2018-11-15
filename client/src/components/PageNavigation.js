import React from 'react'
import { connect } from 'react-redux'
import { updatePage } from '../actions/Actions'
import { fetchPeople } from '../actions/AsyncActions'


const PageNavigation = ({ page, updatePage, fetchPeople }) => {
  const goNext = async () => {
    updatePage(page + 1)
    await fetchPeople(page + 1)
  }
  const goBack = async () => {
    updatePage(page - 1)
    await fetchPeople(page - 1)
  }

  const backButton = page > 1 ? <span onClick={goBack}>Back One Page | </span> : <span >On First Page | </span>
  const nextButton = <span onClick={goNext}> Next Page</span>

  return (
    <div>
      {backButton} Current Page: {page} | {nextButton}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    page: state.peopleInfo.page
  }
}

const mapDispatchToProps = {
  updatePage,
  fetchPeople
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNavigation)