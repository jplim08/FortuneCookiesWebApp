import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FortunesComponent } from './fortunes.component';

const routes: Routes = [
  { path: '', component: FortunesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FortunesRoutingModule { }
