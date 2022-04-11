import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoadAllSpecies } from './store/species.actions';
import { LoadAllOccupations } from './store/occupations.actions';
import { AppReady } from './store/ready.actions';

@Injectable()
export class CanActivateWhenReady implements CanActivate {

  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {

    const ready$ = new Subject<boolean>();
    const ready = this.store.selectSnapshot(state => state.app.ready);
    if (ready) {
      ready$.next(true);
    } else {
      this.store.dispatch([new LoadAllSpecies(), new LoadAllOccupations()])
        .subscribe( () => {
          this.store.dispatch(new AppReady());
          ready$.next(true);
        }, () => {
          ready$.next(false);
        });
    }
    return ready$;
  }
}
