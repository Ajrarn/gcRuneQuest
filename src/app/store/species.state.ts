import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { LoadAllSpecies,LoadSpecie } from './species.actions';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
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
    const ready$ = new Subject<boolean>();
    this.httpClient.get('assets/datas/species/index.txt', { responseType: 'text' })
      .subscribe(index => {
        // read the index to create a list of actions
        const dispatchList:LoadOccupation[] = [];
        const filesList = index.split(/\r\n|\n/).filter(item => item !== '');
        filesList.forEach((file => {
          dispatchList.push(new LoadSpecie(file));
        }));

        //dispatch this actions
        ctx.dispatch(dispatchList).subscribe({
          complete: () => {
            ready$.next(true);
          },
          error: () => ready$.error(false)
        });
        }
      );
    return ready$;
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
          ctx.setState([...state, data].sort());
        })
      );
  }

}
