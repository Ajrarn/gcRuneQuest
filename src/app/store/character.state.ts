import { Action, State, StateContext } from '@ngxs/store';
import { Character, Homeland } from './models';
import { Injectable } from '@angular/core';
import { UpdateCharacter } from './character.actions';

@State<Character>({
  name: 'character',
  defaults: {
    specie: null,
    culture: null,
    skills: [],
    spells: [],
    languages: []
  }
})
@Injectable()
export class CharacterState {

  @Action(UpdateCharacter)
  loadAllCultures(ctx: StateContext<Character>, action: UpdateCharacter) {
    ctx.setState(action.character);
  }
}
