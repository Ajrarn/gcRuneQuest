import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadAllOccupations, LoadOccupation } from './occupations.actions';
import { Subject } from 'rxjs';
import { AbstractDataState } from './abstract-data-state';


@State<any>({
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
    return this.load('assets/datas/occupations/' + loadOccupation.filename, ctx);
  }
}
