import * as React from 'react';
import { View } from 'react-native';

interface AppGapProps {
  height?: number | string;
  width?: number | string;
  backgroundColor?: string;
}

const AppGap: React.FC<AppGapProps> = (props) => <View style={{ ...props }} />;

export default AppGap;
