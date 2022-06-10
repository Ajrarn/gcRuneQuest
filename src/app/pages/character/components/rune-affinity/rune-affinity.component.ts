import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { FormControlPlus } from '../../../../shared/form-control-plus';
import { Culture, Specie } from '../../../../store/models';
import { GCRValidators } from '../../../../shared/gcr-validators';
import { debounceTime, Subscription } from 'rxjs';
import { CharacterUpdateRunes } from '../../../../store/character.actions';

@Component({
  selector: 'app-rune-affinity',
  templateUrl: './rune-affinity.component.html',
  styleUrls: ['./rune-affinity.component.less']
})
export class RuneAffinityComponent implements OnChanges, OnDestroy {

  formRuneAffinity: FormGroup;
  specieRunes: FormArray;
  initialValues: any;
  pointsRemaining = 50;

  @Input()
  specie: Specie | undefined;

  @Input()
  culture: Culture | undefined;

  @Output()
  valid = new EventEmitter<boolean>();

  subscription = new Subscription();

  constructor(private store: Store, private fb: FormBuilder, private translateService: TranslateService) {
    this.formRuneAffinity = fb.group({
      specieRunes: fb.array([], [GCRValidators.differentValues()]),
      elementalRunes: fb.group({
        fire: fb.control(0),
        air: fb.control(0),
        darkness: fb.control(0),
        moon: fb.control(0),
        earth: fb.control(0),
        water: fb.control(0)
      }),
      powerRunes: fb.array([])
    });

    this.subscription.add(
      this.formRuneAffinity.valueChanges
        .pipe(
          debounceTime(300)
        ).subscribe(values => {
          this.store.dispatch(new CharacterUpdateRunes(values));

          if (this.formRuneAffinity.valid) {
            this.pointsRemaining = 50 - this.changePoints(values);
            if (this.pointsRemaining === 0) {
              this.valid.emit(this.formRuneAffinity.valid);
            }
            console.log('initial', this.initialValues);
            console.log('actual', values);
            console.log('changes', this.changePoints(values));
          } else  {
            this.valid.emit(this.formRuneAffinity.valid);
          }
        }
      )
    );

    this.specieRunes = this.formRuneAffinity.get('specieRunes') as FormArray;
    if (this.specieRunes) {
      this.subscription.add(
        this.specieRunes.valueChanges.subscribe(() => {
          this.enableDisableElementalRuneFormPowerRuneForm();
          this.initElementalPowerRuneForm();
        })
      )
    }

    this.enableDisableElementalRuneFormPowerRuneForm();
  }

  enableDisableElementalRuneFormPowerRuneForm() {
    const specieRuneForm = this.formRuneAffinity.get('specieRunes');
    const elementalRunesForm = this.formRuneAffinity.get('elementalRunes');
    const powerRunesForm = this.formRuneAffinity.get('powerRunes') as FormArray;

    if (elementalRunesForm) {
      if (specieRuneForm && specieRuneForm.valid) {
        if (elementalRunesForm.disabled) {
          elementalRunesForm.enable();
        }
      } else {
        if (elementalRunesForm.enabled) {
          elementalRunesForm.disable();
        }
      }
    }

    if (powerRunesForm) {
      if (specieRuneForm && specieRuneForm.valid) {
        if (powerRunesForm.disabled) {
          powerRunesForm.enable();
        }
      } else {
        if (powerRunesForm.enabled) {
          powerRunesForm.disable();
        }
      }
    }
  }

  initElementalPowerRuneForm() {
    const specieRuneForm = this.formRuneAffinity.get('specieRunes') as FormArray;
    const elementalRunesForm = this.formRuneAffinity.get('elementalRunes') as FormGroup;
    const powerRunesForm = this.formRuneAffinity.get('powerRunes') as FormArray;

    if (specieRuneForm && specieRuneForm.valid) {

      elementalRunesForm.reset({
        fire: 0,
        air: 0,
        darkness: 0,
        water: 0,
        earth: 0,
        moon: 0
      });
      this.initPowerRunesForm();

      specieRuneForm.controls
        .map(control => control as FormControlPlus)
        .map(item => {
          return {
            runeName: item.value,
            value: item.options.value
          }
        })
        .forEach(runeAndValue => {
          if (runeAndValue.runeName.startsWith('runes.elemental')) {
            let controlName = runeAndValue.runeName.split('.')[2];
            let control = elementalRunesForm.get(controlName);
            if (control) {
              control.setValue(runeAndValue.value, {emitEvent: false});
            }
          } else {
            powerRunesForm.controls.forEach((group: AbstractControl) => {
              let left = group.get('leftRune') as FormControlPlus;
              let right = group.get('rightRune') as FormControlPlus;
              if (left && left.label === runeAndValue.runeName) {
                left.setValue(runeAndValue.value, {emitEvent: false});
                right.setValue(100- runeAndValue.value, {emitEvent:false})
              }
              if (right && right.label === runeAndValue.runeName) {
                right.setValue(runeAndValue.value, {emitEvent: false});
                left.setValue(100- runeAndValue.value, {emitEvent:false})
              }
            });
          }
      });
    }

    this.applyCultureModifier();

    // save the initila values
    this.initialValues = this.formRuneAffinity.getRawValue();
    console.log('initialValues', this.initialValues);

  }

  initSpecieRuneForm() {
    if (this.specie) {
      this.clearFormArray(this.formRuneAffinity.controls['specieRunes'] as FormArray);
      this.specie.specieRunes.forEach(rune => {
        if (rune.name.includes('choice')) {
          if (rune.choice?.length === 1) {
            (this.formRuneAffinity.controls['specieRunes'] as FormArray).push(
              new FormControlPlus(rune.choice[0], [Validators.required], null, rune.name,{ choice: rune.choice, value: rune.value })
            );
          } else {
            (this.formRuneAffinity.controls['specieRunes'] as FormArray).push(
              new FormControlPlus(null, [Validators.required], null, rune.name,{ choice: rune.choice, value: rune.value })
            );
          }
        }
      });
    }
  }

  initPowerRunesForm() {
    if (this.specie) {
      this.clearFormArray(this.formRuneAffinity.controls['powerRunes'] as FormArray);
      this.specie.powerRunes.forEach(oppositeRunes => {
        (this.formRuneAffinity.controls['powerRunes'] as FormArray).push(new FormGroup({
          leftRune: new FormControlPlus(oppositeRunes.leftRune.value, null, null, oppositeRunes.leftRune.name, {runeIcon:this.getRuneIcon(oppositeRunes.leftRune.name)}),
          rightRune: new FormControlPlus(oppositeRunes.rightRune.value, null, null, oppositeRunes.rightRune.name, {runeIcon:this.getRuneIcon(oppositeRunes.rightRune.name)})
        }));
      });
    }
  }

  applyCultureModifier() {
    if (this.culture) {

      const elementalRunesForm = this.formRuneAffinity.get('elementalRunes') as FormGroup;
      const powerRunesForm = this.formRuneAffinity.get('powerRunes') as FormArray;

      this.culture.runes
        .forEach(runeAndValue => {
          if (runeAndValue.name.startsWith('runes.elemental')) {
            let controlName = runeAndValue.name.split('.')[2];
            let control = elementalRunesForm.get(controlName);
            if (control) {
              control.setValue(control.value + runeAndValue.value, {emitEvent: false});
            }
          } else {
            powerRunesForm.controls.forEach((group: AbstractControl) => {
              let left = group.get('leftRune') as FormControlPlus;
              let right = group.get('rightRune') as FormControlPlus;
              if (left && left.label === runeAndValue.name) {
                left.setValue(left.value + runeAndValue.value, {emitEvent: false});
                // @ts-ignore
                right.setValue(right.value - runeAndValue.value, {emitEvent:false})
              }
              if (right && right.label === runeAndValue.name) {
                right.setValue(right.value + runeAndValue.value, {emitEvent: false});
                // @ts-ignore
                left.setValue(left.value - runeAndValue.value, {emitEvent:false})
              }
            });
          }
        });
    }
  }

  getSpecieRunes(): FormArray {
    return this.formRuneAffinity.get('specieRunes') as FormArray;
  }

  getPowerRunes(): FormArray {
    return this.formRuneAffinity.get('powerRunes') as FormArray;
  }

  getRuneIcon(runeName: string) {
    switch (runeName) {
      case 'runes.power_form.man': {
        return 'rune:man';
      }
      case 'runes.power_form.plant': {
        return 'rune:plant';
      }
      case 'runes.power_form.beast': {
        return 'rune:beast';
      }
      case 'runes.power_form.fertility': {
        return 'rune:fertility';
      }
      case 'runes.power_form.death': {
        return 'rune:death';
      }
      case 'runes.power_form.harmony': {
        return 'rune:harmony';
      }
      case 'runes.power_form.disorder': {
        return 'rune:disorder';
      }
      case 'runes.power_form.truth': {
        return 'rune:truth';
      }
      case 'runes.power_form.illusion': {
        return 'rune:illusion';
      }
      case 'runes.power_form.stasis': {
        return 'rune:stasis';
      }
      case 'runes.power_form.movement': {
        return 'rune:movement-change';
      }
      default: {
        return '';
      }
    }
  }

  changePoints(values: { elementalRunes: { fire: number; darkness: number; water: number; earth: number; air: number; moon: number; }; powerRunes: { leftRune: number; rightRune: number; }[]; }) {
    let difference = 0;
    difference += (values.elementalRunes.fire - this.initialValues.elementalRunes.fire);
    difference += (values.elementalRunes.darkness - this.initialValues.elementalRunes.darkness);
    difference += (values.elementalRunes.water - this.initialValues.elementalRunes.water);
    difference += (values.elementalRunes.earth - this.initialValues.elementalRunes.earth);
    difference += (values.elementalRunes.air - this.initialValues.elementalRunes.air);
    difference += (values.elementalRunes.moon - this.initialValues.elementalRunes.moon);

    values.powerRunes.forEach((line: { leftRune: number; rightRune: number; }, index: number) => {
      if (line.leftRune > this.initialValues.powerRunes[index].leftRune) {
        difference += (line.leftRune - this.initialValues.powerRunes[index].leftRune)
      } else {
        difference += (line.rightRune - this.initialValues.powerRunes[index].rightRune)
      }
    });

    return difference;
  }

  getRuneLabel(rune: FormControlPlus): string {
    if (rune.label && rune.options && rune.options.value) {
      return this.translateService.instant(rune.label, {value: rune.options.value});
    }
    return '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initSpecieRuneForm();
    this.initPowerRunesForm();
    this.enableDisableElementalRuneFormPowerRuneForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * this function remove all items in FormArray without losing the synchronisation that trigger valueChanges
   * @param formArray
   */
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

}
