import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Title, TitleState } from './store/title.state';
import { Observable } from 'rxjs';

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

  @Select(TitleState) title$!: Observable<Title>;
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
    this.store.select(state => state.species).subscribe((species) => {
      this.species = species.map((specie: any)  => specie.name);
    })

    this.store.select(state => state.occupations).subscribe((occupations) => {
      this.occupations = occupations.map((occupation: any)  => occupation.name);
    })

    this.title$.subscribe(title => {
      this.title = title.value;
    });
  }

  isCollapsed = true;


  useLanguage(language: string): void {
    this.translate.use(language);
  }


}
