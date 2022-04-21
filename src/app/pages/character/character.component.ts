import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ChangeTitle } from '../../store/title.action';

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

  constructor(private store: Store) {
    this.store.dispatch(new ChangeTitle('static.character'))
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
