import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../store/models';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.less']
})
export class CharacterSheetComponent {

  @Select((state: { character: any; }) => state.character) sheet$: Observable<Character> | undefined;
  sheet: Character | undefined;

  constructor() {
    this.sheet$?.subscribe(char => {
      this.sheet = char;
    })
  }

  getCharacter() {
    let response = '';
    if (this.sheet) {
      response = JSON.stringify(this.sheet);
    }
    return response;
  }

}
