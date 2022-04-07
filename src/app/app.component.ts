import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gcRuneQuest';

  constructor(private translate: TranslateService) {
    const browser = translate.getBrowserLang()
    let current = 'en';
    if (browser) {
      current = browser;
    }
    translate.setDefaultLang(current);
    console.log('browserLang', translate.getBrowserLang());
    console.log('browserCultureLang', translate.getBrowserCultureLang());
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
