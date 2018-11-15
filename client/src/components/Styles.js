import styled from 'styled-components'

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;
  margin: 10px;
`

export const StyledCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
`

export const StyledCard = styled.div`
  border: solid 2px black;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 350px;
  text-decoration: none;
  margin: 10px;
  padding: 15px;
`