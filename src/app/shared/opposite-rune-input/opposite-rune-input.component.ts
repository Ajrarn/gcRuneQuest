import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
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

  @Input()
  runeGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.runeGroup = fb.group({
      leftRune: new FormControlPlus(),
      rightRune: new FormControlPlus()
    });
  }

  getRuneControl(controlName: string): FormControlPlus | null {
    if (this.runeGroup) {
      return this.runeGroup.controls[controlName] as FormControlPlus;
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
    this.runeGroup.get('rightRune').valueChanges.subscribe(value => {
      // @ts-ignore
      this.runeGroup.get('rightRune').setValue(value, {onlySelf: true, emitEvent: false});
      // @ts-ignore
      this.runeGroup.get('leftRune').setValue(100 - value, {onlySelf: true, emitEvent: false});
    });

    // @ts-ignore
    this.runeGroup.get('leftRune').valueChanges.subscribe(value => {
      // @ts-ignore
      this.runeGroup.get('rightRune').setValue(100 - value, {onlySelf: true, emitEvent: false});
    });

  }





}
