import React from 'react'

import { ConnectedNavBar } from '../containers/ConnectedNavBar'
import { Intro } from './Intro'
import { FlexBox } from './sharedComponents/CommonStyles'

export const LandingPage = () => (
  <div>
    <ConnectedNavBar />
    <FlexBox>
      <Intro />
    </FlexBox>
  </div>
);
