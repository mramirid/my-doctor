import * as React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import Colors from '../../../constants/colors';
import AppCard from '../../atoms/AppCard';
import AppTouchable from '../../atoms/clickables/AppTouchable';

interface SendButtonProps {
  disabled?: boolean;
  onPress(): void;
}

const SendButton: React.FC<SendButtonProps> = (props) => {
  const buttonColor = !props.disabled ? Colors.Blue : Colors.Grey1;
  const iconColor = !props.disabled ? Colors.White : Colors.Grey2;
  return (
    <AppCard style={{ ...styles.buttonContainer, backgroundColor: buttonColor }}>
      <AppTouchable
        disabled={props.disabled}
        style={styles.buttonContent}
        useForeground
        onPress={props.onPress}>
        <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.67 22.217L3.18 16.848l21.864-6.597L14.75 30.636l-4.507-5.356 10.205-11.174-12.776 8.11zM6.66 17.884l7.822-2.36-6.403 4.067-1.42-1.707zm11.35 1.859l-3.683 7.294-1.427-1.7 5.11-5.594z"
            fill={iconColor}
          />
        </Svg>
      </AppTouchable>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    width: 45,
  },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8,
  },
});

export default SendButton;
