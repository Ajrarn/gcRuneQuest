import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { FormControlArray } from '../../../../shared/Form-control-array';
import { Specie } from '../../../../store/models';

@Component({
  selector: 'app-rune-affinity',
  templateUrl: './rune-affinity.component.html',
  styleUrls: ['./rune-affinity.component.less']
})
export class RuneAffinityComponent implements OnChanges {

  formRuneAffinity: FormGroup;

  @Input()
  specie: Specie | undefined;

  constructor(private store: Store, private fb: FormBuilder, private translateService: TranslateService) {
    this.formRuneAffinity = fb.group({
      runes: fb.array([])
    });
  }

  initFormRuneAffinity() {
    if (this.specie) {
      this.specie.runes.forEach(rune => {
        if (rune.name.includes('choice')) {
          (this.formRuneAffinity.controls['runes'] as FormArray).push(
            new FormControlArray(null, [Validators.required], null, rune.name,{ choice: rune.choice, value: rune.value })
          );
        } // TODO: else on ajoute la rune directement dans character
      });
    }
  }

  get runes() : FormArray {
    return this.formRuneAffinity.get("runes") as FormArray
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
