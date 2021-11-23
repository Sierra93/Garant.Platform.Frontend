import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogFranchiseModule } from './modules/franchise/catalog-franchise/catalog-franchise.component';
import { EditFranchiseModule } from './modules/franchise/edit-franchise/edit-franchise.component';
import { CreateFranchiseModule } from './modules/franchise/create-franchise/create-franchise.component';
import { LoginModule } from './modules/login/login.component';
import { MainPageModule } from './modules/main-page/main-page.component';
import { ProfileDataModule } from "./modules/profile/profile-data/profile-data.component";
import { ViewFranchiseModule } from './modules/franchise/view-franchise/view-franchise.component';
import { CreateReadyBusinessModule } from './modules/business/create-ready-business/create-ready-business.component';
import { ViewReadyBusinessModule } from './modules/business/view-ready-business/view-ready-business.component';
import { EditReadyBusinessModule } from './modules/business/edit-ready-business/edit-ready-business.component';
import { CreateAdModule } from './modules/ad/create-ad/create-ad.component';
import { ProfileMyDataModule } from './modules/profile/profile-my-data/profile-my-data.component';
import { ProfileMyMessagesModule } from './modules/profile/profile-my-messages/profile-my-messages.component';

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
  },

  {
    path: "profile/my-data",
    component: ProfileMyDataModule
  },

  {
    path: "profile/chat/messages",
    component: ProfileMyMessagesModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
