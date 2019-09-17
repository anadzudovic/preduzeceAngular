import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IgrackaComponent } from './igracka/igracka.component';
import { KatalogComponent } from './katalog/katalog.component';

const routes: Routes = [
  {
    path: 'igracka',
    component: IgrackaComponent
  },
  {
    path: 'katalog',
    component: KatalogComponent
  },

  {
    path: '',
    component: KatalogComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: KatalogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
