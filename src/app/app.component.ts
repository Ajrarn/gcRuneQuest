import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import {
  LoadAgimori,
  LoadBaboon,
  LoadCentaur,
  LoadDarkTroll,
  LoadDuck,
  LoadDwarf, LoadElf, LoadGreatTroll,
  LoadHumans, LoadMinotaur, LoadMorokanth, LoadTrollkin
} from './store/data.actions';

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

  species = [
    'agimori',
    'baboon',
    'centaur',
    'dark_troll',
    'duck',
    'dwarf',
    'elf',
    'great_troll',
    'human',
    'minotaur',
    'morokanth',
    'trollkin',
  ]

  constructor(private translate: TranslateService, private store: Store ) {
    const browser = translate.getBrowserLang()
    let current = 'en';
    if (browser) {
      current = browser;
    }
    translate.setDefaultLang(current);
    console.log('browserLang', translate.getBrowserLang());
    console.log('browserCultureLang', translate.getBrowserCultureLang());

    this.store.dispatch([new LoadAgimori(), new LoadBaboon(), new LoadCentaur(), new LoadDarkTroll(),
      new LoadDuck(), new LoadDwarf(), new LoadElf(), new LoadGreatTroll(), new LoadHumans(), new LoadMinotaur(),
      new LoadMorokanth(), new LoadTrollkin()]);
  }

  isCollapsed = false;


  useLanguage(language: string): void {
    this.translate.use(language);
  }


}
