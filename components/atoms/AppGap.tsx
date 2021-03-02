import * as React from 'react';
import { View } from 'react-native';

interface AppGapProps {
  height?: number | string;
  width?: number | string;
}

const AppGap: React.FC<AppGapProps> = (props) => (
  <View style={{ height: props.height, width: props.width }} />
);

export default AppGap;
