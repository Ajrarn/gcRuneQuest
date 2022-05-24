import { Directive, Input, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[syncControl]'
})
export class SyncControlDirective implements OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('syncControl')
  set active(val: boolean | undefined) {
    if (val === false) {
      this.destroySubscription();
    } else {
      this.createSubscription();
    }
  }

  private subscription?: Subscription;

  constructor(private ngControl: NgControl) {}

  ngOnDestroy() {
    this.destroySubscription();
  }

  createSubscription() {
    if (this.subscription || !this.ngControl || !this.ngControl.control) {
      return;
    }

    this.subscription = this.ngControl.control.valueChanges.subscribe(value => {
      if (this.ngControl.valueAccessor) {
        this.ngControl.valueAccessor.writeValue(value);
      }
    });
  }

  destroySubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
