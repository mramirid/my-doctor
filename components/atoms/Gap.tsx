import * as React from 'react';
import { View } from 'react-native';

interface GapProps {
  height?: number | string;
  width?: number | string;
}

const Gap: React.FC<GapProps> = (props) => (
  <View style={{ height: props.height, width: props.width }} />
);

export default Gap;
