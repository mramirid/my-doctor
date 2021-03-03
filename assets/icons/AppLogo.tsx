import * as React from 'react';
import Svg, { Ellipse, Path, Rect, SvgProps } from 'react-native-svg';

import Colors from '../../constants/colors';

const AppLogo: React.FC<SvgProps> = (props) => (
  <Svg width={86} height={75} viewBox="0 0 86 75" fill="none" {...props}>
    <Path
      d="M78.441 20.015h-5.277C68.674 9.442 58.79 1.758 47.412.29 36.135-1.2 25.056 3.105 17.807 11.772a32.724 32.724 0 00-5.058 8.243h-5.19C3.39 20.015 0 23.378 0 27.513v9.997c0 4.135 3.39 7.498 7.559 7.498h10.347l-1.083-3.278c-3.152-9.548-1.378-19.304 4.864-26.765C27.822 7.63 37.188 4 46.758 5.245c10.12 1.308 18.904 8.407 22.384 18.091l.021.057c.561 1.479.955 3 1.181 4.564.756 4.674.325 9.411-1.242 13.7l-.011.03C65.2 52.644 54.736 60.004 43.05 60.004c-4.196 0-7.609 3.363-7.609 7.498S38.832 75 43 75s7.559-3.363 7.559-7.498v-3.37A32.639 32.639 0 0073.13 45.007h5.31c4.168 0 7.559-3.364 7.559-7.498v-9.997c0-4.135-3.39-7.498-7.559-7.498z"
      fill={Colors.Green2}
    />
    <Ellipse cx={43} cy={32.808} rx={21.5} ry={21.328} fill={Colors.Green2} />
    <Path
      d="M22.5 58c-1.5-1.832 5.898-12.822 5.898-12.822l3.877 3.846 3.876 3.845S24 59.832 22.5 58z"
      fill={Colors.Green2}
    />
    <Rect
      width={6.02}
      height={23.887}
      rx={3.01}
      transform="matrix(-1 0 0 1 46.01 21.291)"
      fill={Colors.White}
    />
    <Rect
      width={5.972}
      height={24.08}
      rx={2.986}
      transform="matrix(0 -1 -1 0 55.04 35.794)"
      fill={Colors.White}
    />
  </Svg>
);

export default React.memo(AppLogo);
