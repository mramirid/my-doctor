import React from 'react';
import Svg, { Circle, Ellipse, G, Mask, Path, SvgProps } from 'react-native-svg';

import { EMaskUnits } from '../types';

export default function GeneralPractitioner(props: SvgProps) {
  return (
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
        <Ellipse cx={17} cy={33.5} rx={9} ry={2.5} fill="#0AA8B0" />
        <Path
          d="M21.216 18.934l-.24.24-1.197 5.58-2.503 2.502 1.322 2.146 7.468-6.822-4.85-3.646z"
          fill="#D5E7FF"
        />
        <Path
          d="M29.066 26.785l-3.323-4.528-7.145 7.145 2.146 1.322 2.502-2.503 5.58-1.196.24-.24z"
          fill="#ACCEFF"
        />
        <Path
          d="M19.333 29.313l-2.057-2.057-2.558 2.558a2.452 2.452 0 000 3.468l4.615-3.969z"
          fill="#6B66D0"
        />
        <Path
          d="M20.744 30.724L19.01 28.99l-4.292 4.292c.958.957 2.51.957 3.468 0l2.558-2.558z"
          fill="#524798"
        />
        <Path
          d="M42.374 5.626a5.551 5.551 0 00-7.85 0l-1.077 1.077 3.577 4.918 5.35-5.995z"
          fill="#D5E7FF"
        />
        <Path
          d="M42.374 5.626l-5.622 5.622 4.545 3.305 1.077-1.076a5.551 5.551 0 000-7.851z"
          fill="#ACCEFF"
        />
        <Path d="M21.214 18.934l12.23-12.23 4.247 4.248-12.23 12.23-4.247-4.248z" fill="#EAF1FF" />
        <Path
          d="M25.139 22.859l12.229-12.23 3.924 3.925-12.229 12.23-3.924-3.925z"
          fill="#D5E7FF"
        />
        <Path d="M25.412 19.394l7.444-7.443 1.796 1.796-7.444 7.443-1.796-1.796z" fill="#D5E7FF" />
        <Path d="M27.008 20.99l7.443-7.444 1.596 1.596-7.444 7.443-1.595-1.595z" fill="#ACCEFF" />
        <Path
          d="M35.594 8.85a2.515 2.515 0 000 3.556l2.1-1.455L39.15 8.85a2.515 2.515 0 00-3.556 0z"
          fill="#E06379"
        />
        <Path d="M39.15 8.85l-3.556 3.556A2.515 2.515 0 1039.15 8.85z" fill="#C63C50" />
      </G>
    </Svg>
  );
}
