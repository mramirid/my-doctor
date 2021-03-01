import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from 'react-native';

interface AppTouchableProps {
  contentContainerStyle?: ViewStyle;
  onPress(): void;
}

const AppTouchable: React.FC<AppTouchableProps> = (props) => {
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    return (
      <TouchableNativeFeedback onPress={props.onPress} useForeground>
        <View style={props.contentContainerStyle}>{props.children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return (
      <TouchableOpacity style={props.contentContainerStyle} onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    );
  }
};

export default AppTouchable;
