import { NgModule } from '@angular/core';

import { CharacterRoutingModule } from './character-routing.module';

import { CharacterComponent } from './character.component';


@NgModule({
  imports: [CharacterRoutingModule],
  declarations: [CharacterComponent],
  exports: [CharacterComponent]
})
export class CharacterModule { }
