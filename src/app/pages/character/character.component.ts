import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SpeciesSelect, SpeciesState } from '../../store/species.state';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent {

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

  // @ts-ignore
  @Select(SpeciesState.specieForSelect) species$: Observable<string>;
  species: SpeciesSelect[] = [];
  homelands: any[] = [];

  constructor(private store: Store, fb: FormBuilder) {
    this.store.dispatch(new ChangeTitle('static.character'));

    this.formHomeland = fb.group({
      specie: fb.control('species.human'),
      culture: fb.control(null)
    });

    // @ts-ignore
    this.species$.subscribe((values: SpeciesSelect[]) => {
      this.species = values;
      console.log('species', this.species);
    });

    this.formHomeland.controls['specie'].valueChanges.subscribe((specieForm) => {
      this.updateHomelands(specieForm);
    })

    //because default specie is human we must initialize homelands
    this.updateHomelands('species.human')
  }

  updateHomelands(specieForm: string) {
    this.homelands = [];
    if (specieForm) {
      const specie = this.species.find((specie: any) => specie.name === specieForm);
      if (specie && specie.cultures) {
        specie.cultures.forEach((item) => {
          let line = item.split('.');
          let homeland = 'homeland.' + line[1];
          let home = this.homelands.find((item: any) => item.name === homeland);
          if (home) {
            home.cultures.push(item);
          } else {
            this.homelands.push({name: homeland, cultures: [item]})
          }
        });

        this.homelands.sort((previous, current) => {
          return previous.name.localeCompare(current.name);
        });

        this.homelands.forEach((homeland) => {
          homeland.cultures.sort((previous: string, current: string) => {
            return previous.localeCompare(current);
          });
        })
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
