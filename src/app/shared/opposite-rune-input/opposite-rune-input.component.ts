import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlPlus } from '../form-control-plus';

@Component({
  selector: 'app-opposite-rune-input',
  templateUrl: './opposite-rune-input.component.html',
  styleUrls: ['./opposite-rune-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OppositeRuneInputComponent),
      multi: true
    }]
})
export class OppositeRuneInputComponent implements OnChanges {


  _runeGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this._runeGroup = fb.group({
      leftRune: new FormControlPlus(),
      rightRune: new FormControlPlus()
    });
  }

  @Input()
  set runeGroup(group: AbstractControl) {
    this._runeGroup = group as FormGroup;
  }

  getRuneControl(controlName: string): FormControlPlus | null {
    if (this._runeGroup) {
      return this._runeGroup.controls[controlName] as FormControlPlus;
    }
    return null;
  }

  getLabel(controlName: string): string {
    const control = this.getRuneControl(controlName);
    if (control) {
      return control.label ? control.label : '';
    }
    return '';
  }

  getIcon(controlName: string): string {
    const control = this.getRuneControl(controlName);
    if (control && control.options) {
      return control.options.runeIcon ? control.options.runeIcon : '';
    }
    return '';
  }

  ngOnChanges(changes: any): void {

    // @ts-ignore
    this._runeGroup.get('rightRune').valueChanges.subscribe(value => {
      // @ts-ignore
      this._runeGroup.get('rightRune').setValue(value, {onlySelf: true, emitEvent: false});
      // @ts-ignore
      this._runeGroup.get('leftRune').setValue(100 - value, {onlySelf: true, emitEvent: false});
    });

    // @ts-ignore
    this._runeGroup.get('leftRune').valueChanges.subscribe(value => {
      // @ts-ignore
      this._runeGroup.get('rightRune').setValue(100 - value, {onlySelf: true, emitEvent: false});
    });
  }
}
