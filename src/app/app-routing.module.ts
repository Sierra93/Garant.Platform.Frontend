import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './modules/login/login.component';
import { MainPageModule } from './modules/main-page/main-page.component';
import { ProfileDataModule } from "./modules/profile-data/profile-data.component";

const routes: Routes = [
  {
    path: "",
    component: MainPageModule
  },

  {
    path: "login",
    component: LoginModule
  },

  {
    path: "profile-data",
    component: ProfileDataModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
