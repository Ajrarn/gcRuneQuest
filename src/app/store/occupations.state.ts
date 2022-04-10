import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadAllOccupations, LoadAssistantShaman } from './occupations.actions';
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
  loadAllSpecies(ctx: StateContext<any>) {
    return ctx.dispatch([new LoadAssistantShaman()]);
  }

  @Action(LoadAssistantShaman)
  loadAgimori(ctx: StateContext<any>) {
    return this.load('assets/datas/occupations/assistant_shaman.json', ctx);
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
