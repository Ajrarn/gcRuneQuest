import { Pipe, PipeTransform } from '@angular/core';
import { FormControlArray } from './Form-control-array';

@Pipe({
  name: 'cfca',
  pure: true
})
export class CastFormControlArrayPipe implements PipeTransform {
  transform(value: any, args?: any): FormControlArray {
    return value;
  }
}
