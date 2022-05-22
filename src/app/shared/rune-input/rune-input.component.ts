import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rune-input',
  templateUrl: './rune-input.component.html',
  styleUrls: ['./rune-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RuneInputComponent),
      multi: true
    }]
})
export class RuneInputComponent implements ControlValueAccessor {

  @Input()
  runeIcon: string = '';

  _minValue: number = 0;
  _maxValue: number = 100;

  get minValue(): string {
    return this._minValue.toString();
  }

  @Input('minValue')
  set minValue(val: string) {
    this._minValue = parseInt(val);
  }

  get maxValue(): string {
    return this._maxValue.toString();
  }


  @Input('maxValue')
  set maxValue(val: string) {
    this._maxValue = parseInt(val);
  }

  internalValue: number = 100;
  isDisabled = false;

  onChange: any = () => {}
  onTouch: any = () => {}

  set value(val: number) {
    if( val !== undefined && this.internalValue !== val) {
      this.internalValue = val;
      this.onChange(val)
      this.onTouch(val)
    }
  }

  registerOnChange(fn: any): void {
    this.onTouch = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(value: number): void {
    this.value = value;
  }

}
