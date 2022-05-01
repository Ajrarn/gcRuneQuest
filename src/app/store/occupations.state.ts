import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadAllOccupations, LoadOccupation } from './occupations.actions';
import { Subject, tap } from 'rxjs';
import { AbstractDataState } from './abstract-data-state';
import * as _ from 'lodash';
import { Occupation, OccupationGroup } from './models';


@State<OccupationGroup[]>({
  name: 'occupations',
  defaults: []
})
@Injectable()
export class OccupationsState extends AbstractDataState {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  @Action(LoadAllOccupations)
  loadAllOccupations(ctx: StateContext<any>) {
    const ready$ = new Subject<boolean>();
    this.httpClient.get('assets/datas/occupations/index.txt', { responseType: 'text' })
      .subscribe(index => {
        // read the index to create a list of actions
        const dispatchList:LoadOccupation[] = [];
        const filesList = index.split(/\r\n|\n/).filter(item => item !== '');
        filesList.forEach((file => {
          dispatchList.push(new LoadOccupation(file));
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

  @Action(LoadOccupation)
  loadOccupation(ctx: StateContext<any>, loadOccupation: LoadOccupation) {
    return this.httpClient.get('assets/datas/occupations/' + loadOccupation.filename, { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          const state = _.cloneDeep(ctx.getState());

          let line = data.name.split('.');
          let group = line[0] + '.' + line[1] + '.name';
          let theGroup = state.find((itemGroup: any) => itemGroup.name.startsWith(group));
          if (theGroup) {
            theGroup.occupations.push(data);
            theGroup.occupations = theGroup.occupations.sort((previous: Occupation, current: Occupation) => {
              return previous.name.localeCompare(current.name);
            })
          } else {
            state.push({name: group, occupations: [data]})
          }

          ctx.setState(state.sort((previous: any, current: any) => {
            return previous.name.localeCompare(current.name);
          }));
        })
      );
  }
}
