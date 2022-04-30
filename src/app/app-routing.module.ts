import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeciesComponent } from './pages/species/species.component';
import { CharacterComponent } from './pages/character/character.component';
import { OccupationsComponent } from './pages/occupations/occupations.component';
import { CanActivateWhenReady } from './can-activate-when-ready';
import { CulturesComponent } from './pages/cultures/cultures.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/character' },
  { path: 'character', component: CharacterComponent, canActivate: [CanActivateWhenReady] },
  { path: 'species', component: SpeciesComponent, canActivate: [CanActivateWhenReady] },
  { path: 'occupations', component: OccupationsComponent, canActivate: [CanActivateWhenReady] },
  { path: 'occupations/:id', component: OccupationsComponent, canActivate: [CanActivateWhenReady] },
  { path: 'cultures', component: CulturesComponent, canActivate: [CanActivateWhenReady] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
