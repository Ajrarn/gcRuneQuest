import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AppReady } from './ready.actions';

@State<any>({
  name: 'app',
  defaults: { ready: false }
})
@Injectable()
export class ReadyState {


  @Action(AppReady)
  appReady(ctx: StateContext<any>) {
    ctx.patchState({ ready: true });
  }

}
