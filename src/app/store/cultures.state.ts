import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { LoadAllCultures, LoadCulture } from './cultures.actions';
import { AbstractDataState } from './abstract-data-state';
import { HttpClient } from '@angular/common/http';
import { Culture, Homeland, Occupation } from './models';
import * as _ from 'lodash';

@State<Homeland[]>({
  name: 'cultures',
  defaults: []
})
@Injectable()
export class CulturesState extends AbstractDataState {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }


  @Action(LoadAllCultures)
  loadAllCultures(ctx: StateContext<Homeland[]>) {
    const ready$ = new Subject<boolean>();
    this.httpClient.get('assets/datas/cultures/index.txt', { responseType: 'text' })
      .subscribe(index => {
        // read the index to create a list of actions
        const dispatchList:LoadCulture[] = [];
        const filesList = index.split(/\r\n|\n/).filter(item => item !== '');
        filesList.forEach((file => {
          dispatchList.push(new LoadCulture(file));
        }));

        //dispatch this actions
        ctx.dispatch(dispatchList).subscribe({
          complete: () => {
            ready$.next(true);
            ready$.complete();
          },
          error: () => ready$.error(false)
        });
      });
    return ready$;
  }

  @Action(LoadCulture)
  loadOccupation(ctx: StateContext<Homeland[]>, loadCulture: LoadCulture) {
    return this.httpClient.get('assets/datas/cultures/' + loadCulture.filename, { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          const state = _.cloneDeep(ctx.getState());

          let line = data.name.split('.');
          let group = line[0] + '.' + line[1] + '.name';
          let theGroup = state.find((itemGroup: any) => itemGroup.name.startsWith(group));
          if (theGroup) {
            theGroup.cultures.push(data);
            theGroup.cultures = theGroup.cultures.sort((previous: Culture, current: Culture) => {
              return previous.name.localeCompare(current.name);
            })
          } else {
            state.push({name: group, cultures: [data]})
          }

          ctx.setState(state.sort((previous: any, current: any) => {
            return previous.name.localeCompare(current.name);
          }));
        })
      );
  }

}
