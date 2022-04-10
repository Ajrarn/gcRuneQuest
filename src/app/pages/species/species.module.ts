import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { SpeciesRoutingModule } from './species-routing.module';

import { SpeciesComponent } from './species.component';
import { TranslateModule } from '@ngx-translate/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';


@NgModule({
    imports: [CommonModule, SpeciesRoutingModule, TranslateModule, NzCollapseModule, NzTableModule, NzCardModule],
  declarations: [SpeciesComponent],
  exports: [SpeciesComponent]
})
export class SpeciesModule { }
