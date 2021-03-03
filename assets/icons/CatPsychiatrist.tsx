import * as React from 'react';
import Svg, { Circle, Ellipse, G, Mask, Path, SvgProps } from 'react-native-svg';

import { EMaskUnits } from './types';

const CatPsychiatrist: React.FC<SvgProps> = (props) => (
  <Svg width={46} height={46} viewBox="0 0 46 46" fill="none" {...props}>
    <Mask
      id="prefix__a"
      maskUnits={EMaskUnits.USER_SPACE_ON_USE}
      x={0}
      y={0}
      width={46}
      height={46}>
      <Circle cx={23} cy={23} r={23} fill="#0BCAD4" />
    </Mask>
    <G mask="url(#prefix__a)">
      <Circle cx={23} cy={23} r={23} fill="#0BCAD4" />
      <Ellipse cx={23} cy={35.5} rx={9} ry={2.5} fill="#0AA8B0" />
      <Path
        d="M21.715 12.353a8.034 8.034 0 10-11.362 11.362L11.638 25 23 36.362l.834-12.613L23 13.638l-1.285-1.285z"
        fill="#E06379"
      />
      <Path
        d="M35.647 12.353a8.034 8.034 0 00-11.362 0L23 13.638v22.724L34.362 25l1.285-1.285a8.034 8.034 0 000-11.362z"
        fill="#C63C50"
      />
      <Path
        d="M19.792 23.578A3.235 3.235 0 0023 28.966l.768-4.231L23 20.37l-3.208 3.208z"
        fill="#F6DCCD"
      />
      <Path
        d="M32.816 15.128a3.234 3.234 0 00-4.574 0L23 20.37v8.596c.5-.148.971-.42 1.366-.814l8.45-8.45a3.234 3.234 0 000-4.574z"
        fill="#F1CBBC"
      />
      <Path d="M21.73 21.64L23 22.91l.66-1.27-.66-1.27-1.27 1.27z" fill="#EEBCA8" />
      <Path d="M30.878 21.64l-4.574-4.574L23 20.37v2.54l3.304 3.304 4.574-4.574z" fill="#E9A48C" />
    </G>
  </Svg>
);

export default React.memo(CatPsychiatrist);
