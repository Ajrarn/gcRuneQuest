import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoadAllOccupations,
  LoadAssistantShaman,
  LoadBandit,
  LoadChariotDriver,
  LoadCrafter
} from './occupations.actions';
import { tap } from 'rxjs';


@State<any>({
  name: 'occupations',
  defaults: []
})
@Injectable()
export class OccupationsState {

  constructor(private httpClient: HttpClient) {
  }

  @Action(LoadAllOccupations)
  loadAllOccupations(ctx: StateContext<any>) {
    return ctx.dispatch([new LoadAssistantShaman(), new LoadBandit(), new LoadChariotDriver(), new LoadCrafter()]);
  }

  @Action(LoadAssistantShaman)
  loadAssistantChaman(ctx: StateContext<any>) {
    return this.load('assets/datas/occupations/assistant_shaman.json', ctx);
  }

  @Action(LoadBandit)
  loadBandit(ctx: StateContext<any>) {
    return this.load('assets/datas/occupations/bandit.json', ctx);
  }

  @Action(LoadChariotDriver)
  loadChariotDriver(ctx: StateContext<any>) {
    return this.load('assets/datas/occupations/chariot_driver.json', ctx);
  }

  @Action(LoadCrafter)
  loadCrafter(ctx: StateContext<any>) {
    return this.load('assets/datas/occupations/crafter.json', ctx);
  }

  load(param: string, ctx: StateContext<any>) {
    return this.httpClient.get(param, { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          const state = ctx.getState();
          ctx.setState([...state, data]);
        })
      );
  }
}
