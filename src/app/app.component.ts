import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Title, TitleState } from './store/title.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  languages = [
    { name: "Français", value: 'fr' },
    { name: "English", value: 'en' }
  ]

  species = []
  occupations = []
  cultures = []

  subscriptions = new Subscription();

  // @ts-ignore for typescript it can be undefined, but it's not
  @Select((state: any) => state.title.value) title$: Observable<string>;
  public title = '';

  constructor(private translate: TranslateService, private store: Store) {
    const browser = translate.getBrowserLang()
    let current = 'en';
    if (browser) {
      current = browser;
    }
    translate.setDefaultLang(current);
  }

  ngOnInit()  {
    this.subscriptions.add(
      this.store.select(state => state.species).subscribe((species) => {
        this.species = species.map((specie: any)  => specie.name);
      })
    );

    this.subscriptions.add(
      this.store.select(state => state.occupations).subscribe((occupations) => {
        this.occupations = occupations.map((occupation: any)  => occupation.name);
      })
    );

    this.subscriptions.add(
      this.store.select(state => state.cultures).subscribe((cultures) => {
        this.cultures = cultures.map((culture: any)  => culture.name);
      })
    );

    this.subscriptions.add(
      this.title$.subscribe(title => {
        this.title = title;
      })
    );

  }

  isCollapsed = true;


  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
