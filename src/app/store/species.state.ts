import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import {
  LoadAgimori, LoadAllSpecies,
  LoadBaboon,
  LoadCentaur,
  LoadDarkTroll,
  LoadDuck,
  LoadDwarf,
  LoadElf, LoadGreatTroll,
  LoadHumans, LoadMinotaur, LoadMorokanth, LoadTrollkin
} from './species.actions';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@State<any>({
  name: 'species',
  defaults: []
})
@Injectable()
export class SpeciesState {

  constructor(private httpClient: HttpClient) {}

  @Action(LoadAllSpecies)
  loadAllSpecies(ctx: StateContext<any>) {
    return ctx.dispatch([new LoadAgimori(), new LoadBaboon(), new LoadCentaur(), new LoadDarkTroll(),
      new LoadDuck(), new LoadDwarf(), new LoadElf(), new LoadGreatTroll(), new LoadHumans(), new LoadMinotaur(),
      new LoadMorokanth(), new LoadTrollkin()]);
  }

  @Action(LoadAgimori)
  loadAgimori(ctx: StateContext<any>) {
    return this.load('assets/datas/species/agimori.json', ctx);
  }

  @Action(LoadBaboon)
  loadBaboon(ctx: StateContext<any>) {
    return this.load('assets/datas/species/baboon.json', ctx);
  }

  @Action(LoadCentaur)
  loadCentaur(ctx: StateContext<any>) {
    return this.load('assets/datas/species/centaur.json', ctx);
  }

  @Action(LoadDarkTroll)
  loadDarkTroll(ctx: StateContext<any>) {
    return this.load('assets/datas/species/dark_troll.json', ctx);
  }

  @Action(LoadDuck)
  loadDuck(ctx: StateContext<any>) {
    return this.load('assets/datas/species/duck.json', ctx);
  }

  @Action(LoadDwarf)
  loadDwarf(ctx: StateContext<any>) {
    return this.load('assets/datas/species/dwarf.json', ctx);
  }

  @Action(LoadElf)
  loadElf(ctx: StateContext<any>) {
    return this.load('assets/datas/species/elf.json', ctx);
  }

  @Action(LoadGreatTroll)
  loadGreatTroll(ctx: StateContext<any>) {
    return this.load('assets/datas/species/great_troll.json', ctx);
  }

  @Action(LoadHumans)
  loadHumans(ctx: StateContext<any>) {
    return this.load('assets/datas/species/humans.json', ctx);

  }

  @Action(LoadMinotaur)
  loadMinotaur(ctx: StateContext<any>) {
    return this.load('assets/datas/species/minotaur.json', ctx);
  }

  @Action(LoadMorokanth)
  loadMorokanth(ctx: StateContext<any>) {
    return this.load('assets/datas/species/morokanth.json', ctx);
  }

  @Action(LoadTrollkin)
  loadTrollkin(ctx: StateContext<any>) {
    return this.load('assets/datas/species/trollkin.json', ctx);
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
