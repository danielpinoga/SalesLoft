import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NAV_HEIGHT = 46;

const StyledNavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-content: center;

  margin: 0px;
  padding: 0px;
  height: ${NAV_HEIGHT}px;
  width: 100%;
`;

let NavText = styled.p`
  color: #4a90e2;
  padding-right: 10px;
  padding-left: 10px;
  color: white;
`;

const Badge = styled.div`
  margin: 3px;
  display: flex;
  min-width: 152px;
  align-items: center;
  overflow: hidden;
  border-radius: 7px;
  border: 2px solid #4a90e2;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  background-color: #4a90e2;
`;

const StyledDanielBadge = styled(Badge)`
  background-color: red;
`

let SignInBadge = () => (
  <Badge>
    <a href='/users/auth/salesloft' style={{ textDecoration: 'none' }}><NavText>Login</NavText></a>
  </Badge>
);

let UserBadge = ({ user }) => (
  <Badge>
    <a href='/users/auth/logout' style={{ textDecoration: 'none' }}><NavText>{user.name}</NavText></a>
  </Badge>
);

const DanielBadge = () => (
  <StyledDanielBadge>
    <Link to='/people' style={{ textDecoration: 'none' }}>
      <NavText>View Daniel's Solution Page</NavText>
    </Link>
  </StyledDanielBadge>
)

let NavBar = ({ user }) => (
  <StyledNavBar>
    <DanielBadge />
    {user ? <UserBadge user={user} /> : <SignInBadge />}
  </StyledNavBar>
);

export default NavBar
