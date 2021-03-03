import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

type AppTouchableProps = TouchableNativeFeedbackProps & TouchableOpacityProps;

const AppTouchable: React.FC<AppTouchableProps> = (props) => {
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    return (
      <TouchableNativeFeedback {...props} useForeground>
        <View style={props.style}>{props.children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  }
};

export default AppTouchable;
