import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import {
  LoadAgimori,
  LoadBaboon,
  LoadCentaur,
  LoadDarkTroll,
  LoadDuck,
  LoadDwarf,
  LoadElf, LoadGreatTroll,
  LoadHumans, LoadMinotaur, LoadMorokanth, LoadTrollkin
} from './data.actions';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@State<any>({
  name: 'data',
  defaults: {
    species: []
  }
})
@Injectable()
export class DataState {

  constructor(private httpClient: HttpClient) {}

  @Action(LoadAgimori)
  loadAgimori(ctx: StateContext<any>) {
    return this.load('assets/datas/agimori.json', ctx);
  }

  @Action(LoadBaboon)
  loadBaboon(ctx: StateContext<any>) {
    return this.load('assets/datas/baboon.json', ctx);
  }

  @Action(LoadCentaur)
  loadCentaur(ctx: StateContext<any>) {
    return this.load('assets/datas/centaur.json', ctx);
  }

  @Action(LoadDarkTroll)
  loadDarkTroll(ctx: StateContext<any>) {
    return this.load('assets/datas/dark_troll.json', ctx);
  }

  @Action(LoadDuck)
  loadDuck(ctx: StateContext<any>) {
    return this.load('assets/datas/duck.json', ctx);
  }

  @Action(LoadDwarf)
  loadDwarf(ctx: StateContext<any>) {
    return this.load('assets/datas/dwarf.json', ctx);
  }

  @Action(LoadElf)
  loadElf(ctx: StateContext<any>) {
    return this.load('assets/datas/elf.json', ctx);
  }

  @Action(LoadGreatTroll)
  loadGreatTroll(ctx: StateContext<any>) {
    return this.load('assets/datas/great_troll.json', ctx);
  }

  @Action(LoadHumans)
  loadHumans(ctx: StateContext<any>) {
    return this.load('assets/datas/humans.json', ctx);

  }

  @Action(LoadMinotaur)
  loadMinotaur(ctx: StateContext<any>) {
    return this.load('assets/datas/minotaur.json', ctx);
  }

  @Action(LoadMorokanth)
  loadMorokanth(ctx: StateContext<any>) {
    return this.load('assets/datas/morokanth.json', ctx);
  }

  @Action(LoadTrollkin)
  loadTrollkin(ctx: StateContext<any>) {
    return this.load('assets/datas/trollkin.json', ctx);
  }

  load(param: string, ctx: StateContext<any>) {
    return this.httpClient.get(param, { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          const state = ctx.getState();
          ctx.setState({species: [...state.species, data]});
        })
      );
  }

}
