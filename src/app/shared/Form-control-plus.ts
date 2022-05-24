import { AsyncValidatorFn, FormControl, FormControlOptions, ValidatorFn } from '@angular/forms';

export class FormControlPlus extends FormControl {

  label: string | null | undefined;
  options: any;

  constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | FormControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null, label?: string | null, options?: any) {

    super(formState, validatorOrOpts, asyncValidator);

    this.label = label;
    this.options = options;
  }
}
