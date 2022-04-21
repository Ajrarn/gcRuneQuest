import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadAllCultures, LoadCulture } from './cultures.actions';
import { AbstractDataState } from './abstract-data-state';
import { HttpClient } from '@angular/common/http';

@State<any>({
  name: 'cultures',
  defaults: []
})
@Injectable()
export class CulturesState extends AbstractDataState {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }


  @Action(LoadAllCultures)
  loadAllCultures(ctx: StateContext<any>) {
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
  loadOccupation(ctx: StateContext<any>, loadCulture: LoadCulture) {
    console.log('filename', loadCulture.filename);
    return this.load('assets/datas/cultures/' + loadCulture.filename, ctx);
  }

}
