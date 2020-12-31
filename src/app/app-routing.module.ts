import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaunchProgramsComponent } from './components/launch-programs/launch-programs.component';

const routes: Routes = [
  { path: '', redirectTo: '/launches', pathMatch: 'full' },
  { path: 'launches', component: LaunchProgramsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
