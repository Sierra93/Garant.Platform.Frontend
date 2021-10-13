import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogFranchiseModule } from './modules/catalog-franchise/catalog-franchise.component';
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
  },

  {
    path: "catalog-franchise",
    component: CatalogFranchiseModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
