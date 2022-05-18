import { AsyncValidatorFn, FormControl, FormControlOptions, ValidatorFn } from '@angular/forms';

export class FormControlArray extends FormControl {

  label: string | undefined;
  options: any;

  constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, label?: string, options?: any) {

    super(formState, validatorOrOpts, asyncValidator);

    this.label = label;
    this.options = options;
  }
}
