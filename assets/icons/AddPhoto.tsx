import React, { FC, memo } from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

import Colors from '../../constants/colors';

const AddPhoto: FC<SvgProps> = (props) => (
  <Svg width={38} height={38} viewBox="0 0 38 38" fill="none" {...props}>
    <Circle cx={19} cy={19} r={17} fill={Colors.Green2} stroke={Colors.White} strokeWidth={4} />
    <Path
      d="M23 18.74c.279 0 .506.095.682.286.19.176.286.403.286.682a.957.957 0 01-.286.704.923.923 0 01-.682.264h-3.432v3.41a.957.957 0 01-.286.704.886.886 0 01-.682.286.957.957 0 01-.704-.286 1 1 0 01-.264-.704v-3.41H14.2a1 1 0 01-.704-.264 1 1 0 01-.264-.704c0-.279.088-.506.264-.682a.957.957 0 01.704-.286h3.432v-3.432c0-.279.088-.506.264-.682a.957.957 0 01.704-.286c.279 0 .506.095.682.286.19.176.286.403.286.682v3.432H23z"
      fill={Colors.White}
    />
  </Svg>
);

export default memo(AddPhoto);
