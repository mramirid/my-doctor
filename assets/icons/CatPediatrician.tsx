import * as React from 'react';
import Svg, { Circle, Ellipse, G, Mask, Path, SvgProps } from 'react-native-svg';

import { EMaskUnits } from './types';

const CatPediatrician: React.FC<SvgProps> = (props) => (
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
      <Ellipse cx={22.5} cy={34} rx={10.5} ry={3} fill="#0AA8B0" />
      <Path d="M18.34 12.817v3.766L15 20.947v13.279h7.5l1.068-21.41H18.34z" fill="#EAF1FF" />
      <Path d="M26.66 16.583v-3.766H22.5v21.409H30V20.947l-3.34-4.364z" fill="#D5E7FF" />
      <Path d="M15 20.947h7.983v8.797H15v-8.797z" fill="#F5D844" />
      <Path d="M22.5 20.947H30v8.797h-7.5v-8.797z" fill="#ECBD2C" />
      <Path d="M16.69 9h6.293v4.715H16.69V9z" fill="#6B66D0" />
      <Path d="M22.5 9h5.81v4.715H22.5V9z" fill="#524798" />
    </G>
  </Svg>
);

export default React.memo(CatPediatrician);
