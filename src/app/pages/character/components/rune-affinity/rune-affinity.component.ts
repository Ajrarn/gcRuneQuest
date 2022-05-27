import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { FormControlPlus } from '../../../../shared/form-control-plus';
import { Specie } from '../../../../store/models';
import { GCRValidators } from '../../../../shared/gcr-validators';
import { CharacterUpdateRunes } from '../../../../store/character.actions';

@Component({
  selector: 'app-rune-affinity',
  templateUrl: './rune-affinity.component.html',
  styleUrls: ['./rune-affinity.component.less']
})
export class RuneAffinityComponent implements OnChanges {

  formRuneAffinity: FormGroup;

  @Input()
  specie: Specie | undefined;

  @Output()
  valid = new EventEmitter<boolean>();

  constructor(private store: Store, private fb: FormBuilder, private translateService: TranslateService) {
    this.formRuneAffinity = fb.group({
      specie_runes: fb.array([], [GCRValidators.differentValues()]),
      elemental_runes: fb.group({
        fire: fb.control(100),
        air: fb.control(100),
        darkness: fb.control(100),
        moon: fb.control(100),
        earth: fb.control(100),
        water: fb.control(100)
      }),
      power_runes: fb.array([])
      });

    this.formRuneAffinity.valueChanges.subscribe(formValues => {
      this.valid.emit(this.formRuneAffinity.valid);

      if (this.formRuneAffinity.valid) {
        this.store.dispatch(new CharacterUpdateRunes(formValues))
      }
    })
  }

  initFormRuneAffinity() {
    if (this.specie) {
      this.formRuneAffinity.controls['specie_runes'] = new FormArray([]);
      this.specie.elemental_runes.forEach(rune => {
        if (rune.name.includes('choice')) {
          (this.formRuneAffinity.controls['specie_runes'] as FormArray).push(
            new FormControlPlus(null, [Validators.required], null, rune.name,{ choice: rune.choice, value: rune.value })
          );
        } // TODO: else on ajoute la rune directement dans character
      });

      this.formRuneAffinity.controls['power_runes'] = new FormArray([]);
      this.specie.power_runes.forEach(oppositeRunes => {
        (this.formRuneAffinity.controls['power_runes'] as FormArray).push(new FormGroup({
          leftRune: new FormControlPlus(oppositeRunes.leftRune.value, null, null, oppositeRunes.leftRune.name, {runeIcon:this.getRuneIcon(oppositeRunes.leftRune.name)}),
          rightRune: new FormControlPlus(oppositeRunes.rightRune.value, null, null, oppositeRunes.rightRune.name, {runeIcon:this.getRuneIcon(oppositeRunes.rightRune.name)})
        }));
      });

    }
  }

  get specie_runes() : FormArray {
    return this.formRuneAffinity.get("specie_runes") as FormArray;
  }

  get power_runes(): FormArray {
    return this.formRuneAffinity.get("power_runes") as FormArray;
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

  getRuneLabel(rune: FormControlPlus): string {
    if (rune.label && rune.options && rune.options.value) {
      return this.translateService.instant(rune.label, {value: rune.options.value});
    }
    return '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initFormRuneAffinity();
  }

}
