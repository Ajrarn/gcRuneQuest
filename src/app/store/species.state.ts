import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { LoadAllSpecies,LoadSpecie } from './species.actions';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LoadOccupation } from './occupations.actions';
import { AbstractDataState } from './abstract-data-state';

@State<any>({
  name: 'species',
  defaults: []
})
@Injectable()
export class SpeciesState extends AbstractDataState {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  @Selector()
  static specieForSelect(state: any[]): string[] {
    return state.map((item:any) => {
      return item.name;
    });
  }

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
            ready$.complete();
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
}
