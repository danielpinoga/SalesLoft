import React from 'react'

const PageNavigation = ({ page, changePage }) => (
  <div>
    {page > 1 ?
      <span onClick={() => changePage('back')}>Back One Page | </span> :
      <span >On First Page | </span>}

    Current Page: {page} |

    <span onClick={() => changePage('next')}> Next Page</span>
  </div>
)

export default PageNavigation