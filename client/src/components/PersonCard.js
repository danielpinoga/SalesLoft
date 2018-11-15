import React from 'react'
import { StyledCard } from './Styles'

const PersonCard = ({ person, dupeResults }) => (
  <StyledCard to={`/people/${person.id}`}>
    <div>Name: {person.display_name}</div>
    <div>Email: {person.email_address}</div>
    <div>Job Title: {person.title}</div>
    {dupeResults.bestDupe ? (
      <div>
        <div>Best Dupe: {dupeResults.bestDupe}</div>
        <div>Points: {dupeResults.points}</div>
      </div>
    ) : null}
  </StyledCard>
)

export default PersonCard