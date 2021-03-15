import { $enum } from 'ts-enum-util';

import { SelectOption } from '../global-types/input';

enum Gender {
  Male = 'Pria',
  Female = 'Wanita',
}

export const genderOptions: SelectOption[] = $enum(Gender).map((value, key) => ({ value, key }));

export default Gender;
