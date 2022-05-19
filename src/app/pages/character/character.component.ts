import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character, Culture, Homeland, OccupationGroup, Specie } from '../../store/models';
import {
  CharacterUpdateCulture,
  CharacterUpdateOccupation,
  CharacterUpdateSpecie
} from '../../store/character.actions';
import * as _ from 'lodash';

enum Icon {
  WARNING = 'warning',
  CHECK = 'check'
}

enum IconStyle {
  ORANGE = 'color:orange',
  GREEN = 'color:green'
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.less']
})
export class CharacterComponent {

  character: Character;

  index = 0;

  tabs = [
    { name: 'steps.homeland' },
    { name: 'steps.family_history' },
    { name: 'steps.rune_affinities' },
    { name: 'steps.characteristics' },
    { name: 'steps.occupation' },
    { name: 'steps.cult' },
    { name: 'steps.personal_skill_bonuses' },
    { name: 'steps.other_informations' }
  ];

  formHomeland: FormGroup;
  formOccupation: FormGroup;

  species: Specie[] = [];
  specie: Specie | undefined;
  homelands: Homeland[] = [];
  allHomelands: Homeland[] = [];
  allOccupations: OccupationGroup[] = [];
  occupations: OccupationGroup[] = [];


  constructor(private store: Store, private fb: FormBuilder) {
    this.store.dispatch(new ChangeTitle('static.character'));

    this.formHomeland = fb.group({
      specie: fb.control('species.human', [ Validators.required ]),
      culture: fb.control('cultures.sartar.heortling', [ Validators.required ]),
      cultureSelectAll: fb.control(false)
    });

    this.formOccupation = fb.group({
      occupation: fb.control('occupations.common.farmer', [ Validators.required ])
    });



    this.species = this.store.selectSnapshot(state => state.species);
    this.allHomelands = this.store.selectSnapshot(state => state.cultures);
    this.allOccupations = this.store.selectSnapshot(state => state.occupations);
    this.character = this.store.selectSnapshot(state => state.character);

    if (this.character && this.character.specie && this.character.specie.length > 0) {
      this.formHomeland.patchValue({specie: this.character.specie}, { emitEvent: false });
      this.filterCulture();
    } else {
      this.selectSpecie('species.human');
    }

    if (this.character && this.character.culture && this.character.culture.length > 0) {
      this.formHomeland.patchValue({culture: this.character.culture}, { emitEvent: false });
    } else {
      this.selectCulture('cultures.sartar.heortling');
    }

    if (this.character && this.character.occupation && this.character.occupation.length > 0) {
      this.formOccupation.patchValue({occupation: this.character.occupation}, { emitEvent: false });
    } else {
      this.selectOccupation('occupations.common.farmer');
    }


    this.formHomeland.controls['specie'].valueChanges.subscribe(specieName => {
      this.selectSpecie(specieName);
    });

    this.formHomeland.controls['culture'].valueChanges.subscribe(cultureName => {
      this.selectCulture(cultureName);
    });
    this.formHomeland.controls['cultureSelectAll'].valueChanges.subscribe(() => {
      this.filterCulture();
    });
    this.formOccupation.controls['occupation'].valueChanges.subscribe((occupationName) => {
      this.selectOccupation(occupationName);
    });
  }

  selectSpecie(specieName: string): void {
    this.specie = this.species.find(item => item.name === specieName);
    if (this.specie) {
      this.store.dispatch(new CharacterUpdateSpecie(this.specie));
      this.filterCulture();
    }
  }

  filterCulture() {
    const specieName = this.formHomeland.controls['specie'].value;
    const specie = this.species.find(item => item.name === specieName);
    const seeAll = this.formHomeland.controls['cultureSelectAll'].value;
    const allHomelands = _.cloneDeep(this.allHomelands)
    if (!seeAll && specie) {
      this.homelands = allHomelands.filter(homeland => {
        let cultures = homeland.cultures.filter(culture => {
          return specie.cultures.includes(culture.name);
        });
        return cultures.length > 0;
      });
      this.homelands.forEach(homeland => {
        homeland.cultures = homeland.cultures.filter(culture => {
          return specie.cultures.includes(culture.name);
        });
      })
    } else {
      this.homelands = allHomelands;
    }

    // reset culture if not in the list
    const culture = this.formHomeland.controls['culture'].value;
    const homelandFound = this.homelands.find(homeland => {
      return homeland.cultures.findIndex(item => item.name === culture) >= 0;
    });
    if (!homelandFound) {
      if (this.homelands && this.homelands.length === 1) {
        if (this.homelands[0].cultures && this.homelands[0].cultures[0]) {
          this.formHomeland.controls['culture'].setValue(this.homelands[0].cultures[0].name);
        }
      } else {
        this.formHomeland.controls['culture'].setValue(null);
      }
    }
  }

  selectCulture(cultureName: string): void {
    if (cultureName) {
      const homelandName = cultureName.split('.', 2).join('.') + '.name';
      const homeland = this.homelands.find(item => item.name === homelandName);
      if (homeland) {
        const culture = homeland.cultures.find(item => item.name === cultureName);
        if (culture) {
          this.store.dispatch(new CharacterUpdateCulture(<Culture>culture));
          this.filterOccupations(culture);
        }
      }
    }
  }

  selectOccupation(occupationName: string): void {
    if (occupationName) {
      const occupationGroupName = occupationName.split('.', 2).join('.') + '.name';
      const occupationGroup = this.occupations.find(item => item.name === occupationGroupName);
      if (occupationGroup) {
        const occupation = occupationGroup.occupations.find(item => item.name === occupationName);
        if (occupation) {
          this.store.dispatch(new CharacterUpdateOccupation(occupation));
        }
      }
    }
  }

  filterOccupations(culture: Culture) {
    this.occupations = [];
    this.allOccupations.forEach(occGroup => {
      let occupationsFiltered = occGroup.occupations.filter(occupation => culture.occupations.includes(occupation.name));
      if (occupationsFiltered && occupationsFiltered.length > 0) {
        this.occupations.push({
          name: occGroup.name,
          occupations: occupationsFiltered
        });
      }
    });
    if (this.occupations && this.occupations.length > 0) {
      this.formOccupation.controls['occupation'].setValue(this.occupations[0].occupations[0].name);
    }
  }


  getIcon(key: string | null): string {
    switch (key) {
      case 'steps.homeland':
        return this.formHomeland.status === 'VALID' ? Icon.CHECK : Icon.WARNING;
      case 'steps.cult':
        return Icon.WARNING;
      case 'steps.other_informations':
        return Icon.WARNING;
      default:
        return Icon.WARNING;
    }
  }

  getStyleIcon(key:string | null): string {

    switch (key) {
      case 'steps.homeland':
        return this.formHomeland.status === 'VALID' ? IconStyle.GREEN : IconStyle.ORANGE;
      case 'steps.cult':
        return IconStyle.ORANGE;
      case 'steps.rune_affinities':
        return IconStyle.ORANGE;
        // return this.formRuneAffinity.status === 'VALID' ? IconStyle.GREEN : IconStyle.ORANGE;
      case 'steps.other_informations':
        return IconStyle.ORANGE;
      default:
       return IconStyle.ORANGE;
    }


  }

}
