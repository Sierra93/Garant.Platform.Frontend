import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogFranchiseModule } from './modules/catalog-franchise/catalog-franchise.component';
import { ChangeFranchiseModule } from './modules/change-franchise/change-franchise.component';
import { CreateFranchiseModule } from './modules/create-franchise/create-franchise.component';
import { LoginModule } from './modules/login/login.component';
import { MainPageModule } from './modules/main-page/main-page.component';
import { ProfileDataModule } from "./modules/profile-data/profile-data.component";
import { ViewFranchiseModule } from './modules/view-franchise/view-franchise.component';

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
  },

  {
    path: "franchise/create",
    component: CreateFranchiseModule
  },

  {
    path: "franchise/view",
    component: ViewFranchiseModule
  },

  {
    path: "franchise/edit",
    component: ChangeFranchiseModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
