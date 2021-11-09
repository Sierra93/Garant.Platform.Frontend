import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogFranchiseModule } from './modules/catalog-franchise/catalog-franchise.component';
import { EditFranchiseModule } from './modules/edit-franchise/edit-franchise.component';
import { CreateFranchiseModule } from './modules/create-franchise/create-franchise.component';
import { LoginModule } from './modules/login/login.component';
import { MainPageModule } from './modules/main-page/main-page.component';
import { ProfileDataModule } from "./modules/profile-data/profile-data.component";
import { ViewFranchiseModule } from './modules/view-franchise/view-franchise.component';
import { CreateReadyBusinessModule } from './modules/create-ready-business/create-ready-business.component';
import { ViewReadyBusinessModule } from './modules/view-ready-business/view-ready-business.component';
import { EditReadyBusinessModule } from './modules/edit-ready-business/edit-ready-business.component';
import { CreateAdModule } from './modules/create-ad/create-ad.component';

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
    component: EditFranchiseModule
  },

  {
    path: "business/create",
    component: CreateReadyBusinessModule
  },

  {
    path: "business/view",
    component: ViewReadyBusinessModule
  },

  {
    path: "business/edit",
    component: EditReadyBusinessModule
  },

  {
    path: "ad/create",
    component: CreateAdModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
