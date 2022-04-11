import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpeciesComponent } from './pages/species/species.component';
import { CharacterComponent } from './pages/character/character.component';
import { OccupationsComponent } from './pages/occupations/occupations.component';
import { CanActivateWhenReady } from './can-activate-when-ready';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/character' },
  { path: 'character', component: CharacterComponent },
  { path: 'species/:id', component: SpeciesComponent, canActivate: [CanActivateWhenReady] },
  { path: 'occupations/:id', component: OccupationsComponent, canActivate: [CanActivateWhenReady] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
