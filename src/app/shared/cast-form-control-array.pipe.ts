import { Pipe, PipeTransform } from '@angular/core';
import { FormControlPlus } from './form-control-plus';

@Pipe({
  name: 'cfca',
  pure: true
})
export class CastFormControlArrayPipe implements PipeTransform {
  transform(value: any, args?: any): FormControlPlus {
    return value;
  }
}
