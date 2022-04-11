import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadAllSpecies } from './store/species.actions';
import { LoadAllOccupations } from './store/occupations.actions';
import { AppReady } from './store/ready.actions';

@Injectable()
export class CanActivateWhenReady implements CanActivate {

  private ready$ = new Subject<boolean>();

  constructor(private store: Store) {}

  canActivate(): Observable<boolean>| boolean {

    const ready = this.store.selectSnapshot(state => state.app.ready);
    if (ready) {
      return true;
    } else {
      const that = this
      this.store.dispatch([new LoadAllSpecies(), new LoadAllOccupations()])
        .subscribe({
          complete: () => {
            that.store.dispatch(new AppReady());
            that.ready$.next(true);
          },
          error: () => this.ready$.next(false)
        });
      return this.ready$;
    }
  }

}
