import { AbstractControl, FormArray, ValidatorFn } from '@angular/forms';
import * as _ from 'lodash';

export class GCRValidators {
  static differentValues(): ValidatorFn {

    return (form: AbstractControl) => {
      const values = (form as FormArray).getRawValue();
      const uniqueValues = _.uniq(values);

      return values.length === uniqueValues.length ? null : {
        differentValues: {
          valid: false,
          message: 'error.different_values'
        }
      };
    }
  }
}
