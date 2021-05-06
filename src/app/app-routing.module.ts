import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './layout/template/template.component';

const routes: Routes = [
  { path: '', redirectTo: 'guest', pathMatch: 'full' },
  {
    path: "guest", component: TemplateComponent,
    children: [
      { path: '', redirectTo: 'fortunes', pathMatch: 'full' },
      { path: 'fortunes', loadChildren: () => import('./modules/fortunes/fortunes.module').then(m => m.FortunesModule) }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
