import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Store } from '@ngxs/store';

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

  occupations = [
    'assistant_shaman',
    'bandit',
    'chariot_driver'
  ]

  constructor(private translate: TranslateService, private store: Store ) {
    const browser = translate.getBrowserLang()
    let current = 'en';
    if (browser) {
      current = browser;
    }
    translate.setDefaultLang(current);
  }

  isCollapsed = false;


  useLanguage(language: string): void {
    this.translate.use(language);
  }


}
