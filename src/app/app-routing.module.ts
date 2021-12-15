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
import { ProfileMyMessagesModule } from './modules/profile/profile-my-dialogs/profile-my-dialogs.component';
import { ProfileDialogMessagesModule } from './modules/profile/profile-dialog-messages/profile-dialog-messages.component';
import { ManageAccountModule } from './modules/profile/manage-account/manage-account.component';
import { MainSearchModule } from './modules/search/main-search/main-search.component';
import { CatalogBusinessModule } from './modules/business/catalog-business/catalog-business.component';
import { GarantInitModule } from './modules/garant/garant-init/garant-init.component';
import { GarantConcordModule } from './modules/garant/garant-concord/garant-concord.component';
import { GarantContractModule } from './modules/garant/garant-contract/garant-contract.component';

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
    path: "profile/chat/dialogs",
    component: ProfileMyMessagesModule
  },

  {
    path: "profile/chat/dialogs/dialog",
    component: ProfileDialogMessagesModule
  },

  {
    path: "manage-account",
    component: ManageAccountModule
  },

  {
    path: "search",
    component: MainSearchModule
  },
  {
    path: "catalog-business",
    component: CatalogBusinessModule
  },

  {
    path: "garant/garant-init",
    component: GarantInitModule
  },

  {
    path: "garant/garant-concord",
    component: GarantConcordModule
  },

  {
    path: "garant/garant-contract",
    component: GarantContractModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
