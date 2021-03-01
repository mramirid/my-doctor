import React, { FC } from 'react';
import { enableScreens } from 'react-native-screens';

import GetStarted from './screens/GetStarted';

enableScreens();

const App: FC = () => {
  return <GetStarted />;
};

export default App;
