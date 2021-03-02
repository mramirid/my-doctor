import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import GetStartedStack from './GetStartedStack';
import HomepageBottomTabs from './HomepageBottomTabs';

const AppNavigator: React.FC = () => {
  const isAuth = React.useRef(true);
  return (
    <NavigationContainer>
      {isAuth.current ? <HomepageBottomTabs /> : <GetStartedStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
