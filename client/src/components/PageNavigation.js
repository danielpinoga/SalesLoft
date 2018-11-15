import React from 'react'
import { connect } from 'react-redux'
import { updatePage } from '../actions/Actions'


const PageNavigation = ({ page, updatePage }) => {
  const goNext = () => updatePage(page + 1)
  const goBack = () => updatePage(page - 1)

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
  updatePage
}

export default connect(mapStateToProps, mapDispatchToProps)(PageNavigation)