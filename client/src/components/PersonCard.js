import React from 'react'
import styled from 'styled-components'

const StyledPerson = styled.div`
  border: solid 2px black;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 350px;
  text-decoration: none;
  margin: 10px;
  padding: 15px;
`

const PersonCard = ({ key, person, dupeResults }) => (
  <StyledPerson key={key} to={`/people/${person.id}`}>
    <div>Name: {person.first_name} {person.last_name}</div>
    <div>Email: {person.email_address}</div>
    <div>Job Title: {person.title}</div>
    {dupeResults.bestDupe ? (
      <div>
        <div>Best Dupe: {dupeResults.bestDupe}</div>
        <div>Points: {dupeResults.points}</div>
      </div>
    ) : null}
  </StyledPerson>
)

export default PersonCard