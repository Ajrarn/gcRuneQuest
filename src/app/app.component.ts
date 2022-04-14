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
    'species.agimori',
    'species.baboon',
    'species.centaur',
    'species.dark_troll',
    'species.duck',
    'species.dwarf',
    'species.elf',
    'species.great_troll',
    'species.human',
    'species.minotaur',
    'species.morokanth',
    'species.trollkin',
  ]

  occupations = [
    'occupations.assistant_shaman',
    'occupations.bandit',
    'occupations.chariot_driver'
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
