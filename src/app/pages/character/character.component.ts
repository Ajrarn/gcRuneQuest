import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character, Culture, Homeland, Specie } from '../../store/models';
import { CharacterUpdateCulture, CharacterUpdateSpecie } from '../../store/character.actions';
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

  species: Specie[] = [];
  homelands: Homeland[] = [];
  allHomelands: Homeland[] = [];


  constructor(private store: Store, fb: FormBuilder) {
    this.store.dispatch(new ChangeTitle('static.character'));

    this.formHomeland = fb.group({
      specie: fb.control('species.human', [ Validators.required ]),
      culture: fb.control('cultures.sartar.heortling', [ Validators.required ]),
      cultureSelectAll: fb.control(false)
    });

    this.species = this.store.selectSnapshot(state => state.species);
    this.allHomelands = this.store.selectSnapshot(state => state.cultures);
    this.character = this.store.selectSnapshot(state => state.character);

    this.selectSpecie('species.human');
    this.selectCulture('cultures.sartar.heortling');

    this.formHomeland.controls['specie'].valueChanges.subscribe(specieName => {
      this.selectSpecie(specieName);
    });

    this.formHomeland.controls['culture'].valueChanges.subscribe(cultureName => {
      this.selectCulture(cultureName);
    });
    this.formHomeland.controls['cultureSelectAll'].valueChanges.subscribe(() => {
      this.filterCulture();
    });
  }

  selectSpecie(specieName: string): void {
    const specie = this.species.find(item => item.name === specieName);
    if (specie) {
      this.store.dispatch(new CharacterUpdateSpecie(<Specie>specie));
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
          // @ts-ignore
          return specie.cultures.findIndex((item: string) => item === culture.name) >= 0;
        });
        return cultures.length > 0;
      });
      this.homelands.forEach(homeland => {
        homeland.cultures = homeland.cultures.filter(culture => {
          // @ts-ignore
          return specie.cultures.findIndex((item: string) => item === culture.name) >= 0;
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
      const splitName = cultureName.split('.');
      const homelandName = splitName[0] + '.' + splitName[1] + '.name';
      const homeland = this.homelands.find(item => item.name === homelandName);
      if (homeland) {
        const culture = homeland.cultures.find(item => item.name === cultureName);
        if (culture) {
          this.store.dispatch(new CharacterUpdateCulture(<Culture>culture));
        }
      }
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
      case 'steps.other_informations':
        return IconStyle.ORANGE;
      default:
       return IconStyle.ORANGE;
    }
  }

}
