import React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

import Colors from '../../constants/colors';

export default function RemovePhoto(props: SvgProps) {
  return (
    <Svg width={38} height={38} viewBox="0 0 38 38" fill="none" {...props}>
      <Circle cx={19} cy={19} r={17} fill={Colors.Red} stroke={Colors.White} strokeWidth={4} />
      <Path
        d="M26 13.41L24.59 12 19 17.59 13.41 12 12 13.41 17.59 19 12 24.59 13.41 26 19 20.41 24.59 26 26 24.59 20.41 19 26 13.41z"
        fill={Colors.White}
      />
    </Svg>
  );
}
