import React, { FC, memo } from 'react';
import { View } from 'react-native';

interface AppGapProps {
  height?: number | string;
  width?: number | string;
  backgroundColor?: string;
}

const AppGap: FC<AppGapProps> = (props) => <View style={{ ...props }} />;

export default memo(AppGap);
