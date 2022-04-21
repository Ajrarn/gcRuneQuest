import { HttpClient } from '@angular/common/http';
import { StateContext } from '@ngxs/store';
import { tap } from 'rxjs';

export abstract class AbstractDataState {

  protected httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  load(param: string, ctx: StateContext<any>) {
    return this.httpClient.get(param, { responseType: 'json' })
      .pipe(
        tap((data: any) => {
          const state = ctx.getState();
          ctx.setState([...state, data].sort((previous: any, current: any) => {
            return previous.name.localeCompare(current.name);
          }));
        })
      );
  }
}
