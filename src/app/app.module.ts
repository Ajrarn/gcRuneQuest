import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { SpeciesState } from './store/species.state';
import { environment } from '../environments/environment';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { OccupationsState } from './store/occupations.state';


import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { SpeciesComponent } from './pages/species/species.component';
import { CharacterComponent } from './pages/character/character.component';
import { OccupationsComponent } from './pages/occupations/occupations.component';
import { ReadyState } from './store/ready.state';
import { CanActivateWhenReady } from './can-activate-when-ready';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { runes } from './runes';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TitleState } from './store/title.state';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CulturesState } from './store/cultures.state';
import { CulturesComponent } from './pages/cultures/cultures.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    SpeciesComponent,
    CharacterComponent,
    OccupationsComponent,
    CulturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxsModule.forRoot([SpeciesState, OccupationsState, CulturesState, ReadyState, TitleState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzCollapseModule,
    NzTableModule,
    NzCardModule,
    NzIconModule.forRoot(runes),
    NzToolTipModule,
    NzSpaceModule,
    NzStepsModule,
    NzTabsModule,
    NzDividerModule,
    NzListModule,
    NzGridModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }, CanActivateWhenReady],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
