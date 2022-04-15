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
  LoadHumans, LoadMinotaur, LoadMorokanth, LoadSpecie, LoadTrollkin
} from './species.actions';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoadOccupation } from './occupations.actions';

@State<any>({
  name: 'species',
  defaults: []
})
@Injectable()
export class SpeciesState {

  constructor(private httpClient: HttpClient) {}

  @Action(LoadAllSpecies)
  loadAllSpecies(ctx: StateContext<any>) {
    return this.httpClient.get('assets/datas/species/index.txt', { responseType: 'text' })
      .pipe(
        tap(index => {
          const dispatchList:LoadOccupation[] = [];
          const filesList = index.split(/\r\n|\n/).filter(item => item !== '');
          filesList.forEach((file => {
            console.log('file', file);
            dispatchList.push(new LoadSpecie(file));
          }));
          return ctx.dispatch(dispatchList);
        })
      );
  }

  @Action(LoadSpecie)
  loadSpecie(ctx: StateContext<any>, loadSpecie: LoadSpecie) {
    console.log('filename', loadSpecie.filename);
    return this.load('assets/datas/species/' + loadSpecie.filename, ctx);
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
