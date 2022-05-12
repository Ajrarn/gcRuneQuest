import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpeciesSelect} from '../../store/species.state';
import { Character, Culture, Homeland, Specie } from '../../store/models';
import { CharacterUpdateCulture, CharacterUpdateSpecie } from '../../store/character.actions';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.less']
})
export class CharacterComponent {

  character: Character;

  index = 0;

  tabs = [
    {
      name: 'steps.homeland'
    },
    {
      name: 'steps.family_history'
    },
    {
      name: 'steps.rune_affinities'
    },
    {
      name: 'steps.characteristics'
    },
    {
      name: 'steps.occupation'
    },
    {
      name: 'steps.cult'
    },
    {
      name: 'steps.personal_skill_bonuses'
    },
    {
      name: 'steps.other_informations'
    }
  ];

  formHomeland: FormGroup;

  species: SpeciesSelect[] = [];
  homelands: Homeland[] = [];

  constructor(private store: Store, fb: FormBuilder) {
    this.store.dispatch(new ChangeTitle('static.character'));

    this.formHomeland = fb.group({
      specie: fb.control('species.human'),
      culture: fb.control('cultures.sartar.heortling')
    });

    this.species = this.store.selectSnapshot(state => state.species);
    this.homelands = this.store.selectSnapshot(state => state.cultures);
    this.character = this.store.selectSnapshot(state => state.character);

    this.selectSpecie('species.human');
    this.selectCulture('cultures.sartar.heortling');

    this.formHomeland.controls['specie'].valueChanges.subscribe(specieName => {
      this.selectSpecie(specieName);
    });

    this.formHomeland.controls['culture'].valueChanges.subscribe(cultureName => {
      this.selectCulture(cultureName);
    });
  }

  selectSpecie(specieName: string): void {
    const specie = this.species.find(item => item.name === specieName);
    if (specie) {
      this.store.dispatch(new CharacterUpdateSpecie(<Specie>specie));
    }
  }

  selectCulture(cultureName: string): void {
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


  getIcon(key: string | null): string {
    let response: string | null;

    switch (key) {
      case 'steps.cult':
        response = 'check';
        break;
      case 'steps.other_informations':
        response = 'warning';
        break;
      default:
        response = 'warning';
    }
    return response;
  }

  getStyleIcon(key:string | null): string | null {

    let response: string;

    switch (key) {
      case 'steps.cult':
        response = 'color:green';
        break;
      case 'steps.other_informations':
        response = 'color:orange';
        break;
      default:
       response = 'color:orange';
    }
    return response;
  }

}
