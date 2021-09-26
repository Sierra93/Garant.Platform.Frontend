import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageModule } from './modules/main-page/main-page';

const routes: Routes = [
  {
    path: "",
    component: MainPageModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
