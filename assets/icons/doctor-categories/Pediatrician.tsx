import React, { FC, memo } from 'react';
import Svg, { Circle, Ellipse, G, Mask, Path, SvgProps } from 'react-native-svg';

import { EMaskUnits } from '../types';

const Pediatrician: FC<SvgProps> = (props) => (
  <Svg width={46} height={46} viewBox="0 0 46 46" fill="none" {...props}>
    <Mask
      id="icon_dokter_umum_svg__a"
      maskUnits={EMaskUnits.USER_SPACE_ON_USE}
      x={0}
      y={0}
      width={46}
      height={46}>
      <Circle cx={23} cy={23} r={23} fill="#0BCAD4" />
    </Mask>
    <G mask="url(#icon_dokter_umum_svg__a)">
      <Circle cx={23} cy={23} r={23} fill="#0BCAD4" />
      <Ellipse cx={23} cy={32} rx={15} ry={3} fill="#0AA8B0" />
      <Path
        d="M21.979 11.901a6.488 6.488 0 00-9.176 9.175l1.038 1.037 9.175 9.175.673-10.185-.673-8.165-1.037-1.037z"
        fill="#E06379"
      />
      <Path
        d="M33.228 11.9a6.488 6.488 0 00-9.175 0l-1.037 1.037v18.35l9.175-9.174 1.037-1.038a6.488 6.488 0 000-9.175z"
        fill="#C63C50"
      />
      <Path
        d="M14.762 14.73h-1.294a2.565 2.565 0 00-2.565 2.565v8.536l.949 1.364v1.463h2.91l.311-1.755-.311-3.387V14.73z"
        fill="#F6DCCD"
      />
      <Path
        d="M17.864 19.835c-.93 0-1.683.753-1.683 1.683v1.287h-1.42v5.853h3.161v-1.463l.75-1.309v-6.05h-.808z"
        fill="#F1CBBC"
      />
      <Path d="M10.903 28.287h4.17v3.445h-4.17v-3.445z" fill="#6B66D0" />
      <Path d="M14.762 28.287h3.91v3.445h-3.91v-3.445z" fill="#524798" />
      <Path
        d="M31.27 14.73h1.294a2.565 2.565 0 012.564 2.565v8.536l-.948 1.364v1.463h-2.91l-.312-1.755.312-3.387V14.73z"
        fill="#F1CBBC"
      />
      <Path
        d="M28.168 19.835c.93 0 1.683.753 1.683 1.683v1.287h1.419v5.853h-3.16v-1.463l-.75-1.309v-6.05h.808z"
        fill="#F6DCCD"
      />
      <Path d="M30.958 28.287h4.17v3.445h-4.17v-3.445z" fill="#524798" />
      <Path d="M27.36 28.287h3.91v3.445h-3.91v-3.445z" fill="#6B66D0" />
    </G>
  </Svg>
);

export default memo(Pediatrician);
