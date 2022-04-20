import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ChangeTitle } from './title.action';

export interface Title {
  value: string
}

@State<Title>({
  name: 'title',
  defaults: {
    value: ''
  }
})
@Injectable()
export class TitleState {

  @Action(ChangeTitle)
  loadSpecie(ctx: StateContext<Title>, action: ChangeTitle) {
    ctx.patchState({ value: action.title });
  }

}
