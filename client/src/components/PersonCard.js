import React from 'react'
import { StyledCard } from './Styles'

const PersonCard = ({ person, dupeResults }) => (
  <StyledCard to={`/people/${person.id}`}>
    <div>Name: {person.display_name}</div>
    <div>Email: {person.email_address}</div>
    <div>Job Title: {person.title}</div>
  </StyledCard>
)

export default PersonCard