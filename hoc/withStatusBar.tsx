import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { Platform, View, ViewStyle } from 'react-native';

export default function withStatusBar<P>(
  WrappedComponent: FC<P>,
  tintColor?: 'auto' | 'inverted' | 'light' | 'dark',
  bgColor?: string
) {
  const containerStyle: ViewStyle = {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,
  };

  const ComponentWithStatusBar: FC<P> = (props) => (
    <View style={containerStyle}>
      <WrappedComponent {...props} />
      <StatusBar style={tintColor} backgroundColor={bgColor} />
    </View>
  );

  return ComponentWithStatusBar;
}
