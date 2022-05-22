import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { FormControlArray } from '../../../../shared/Form-control-array';
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
      })
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
      this.specie.elemental_runes.forEach(rune => {
        if (rune.name.includes('choice')) {
          (this.formRuneAffinity.controls['specie_runes'] as FormArray).push(
            new FormControlArray(null, [Validators.required], null, rune.name,{ choice: rune.choice, value: rune.value })
          );
        } // TODO: else on ajoute la rune directement dans character
      });
    }
  }

  get specie_runes() : FormArray {
    return this.formRuneAffinity.get("specie_runes") as FormArray
  }

  getRuneLabel(rune: FormControlArray): string {
    if (rune.label && rune.options && rune.options.value) {
      return this.translateService.instant(rune.label, {value: rune.options.value});
    }
    return '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initFormRuneAffinity();
  }

}
