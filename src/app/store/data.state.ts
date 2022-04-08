import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
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
    agimori: {},
    baboon: {},
    centaur: {},
    darkTroll: {},
    duck: {},
    dwarf: {},
    elf: {},
    greatTroll: {},
    humans: {},
    minotaur: {},
    morokanth: {},
    trollkin: {}
  }
})
@Injectable()
export class DataState {

  constructor(private httpClient: HttpClient) {}

  @Action(LoadAgimori)
  loadAgimori(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/agimori.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({agimori: data});
        })
      );
  }

  @Action(LoadBaboon)
  loadBaboon(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/baboon.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({baboon: data});
        })
      );
  }

  @Action(LoadCentaur)
  loadCentaur(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/centaur.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({centaur: data});
        })
      );
  }

  @Action(LoadDarkTroll)
  loadDarkTroll(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/dark_troll.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({darkTroll: data});
        })
      );
  }

  @Action(LoadDuck)
  loadDuck(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/duck.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({duck: data});
        })
      );
  }

  @Action(LoadDwarf)
  loadDwarf(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/dwarf.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({dwarf: data});
        })
      );
  }

  @Action(LoadElf)
  loadElf(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/elf.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({elf: data});
        })
      );
  }

  @Action(LoadGreatTroll)
  loadGreatTroll(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/great_troll.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({greatTroll: data});
        })
      );
  }

  @Action(LoadHumans)
  loadHumans(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/humans.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({humans: data});
        })
      );
  }

  @Action(LoadMinotaur)
  loadMinotaur(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/minotaur.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({minotaur: data});
        })
      );
  }

  @Action(LoadMorokanth)
  loadMorokanth(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/humans.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({morokanth: data});
        })
      );
  }

  @Action(LoadTrollkin)
  loadTrollkin(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/trollkin.json', { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          ctx.patchState({trollkin: data});
        })
      );
  }

}
