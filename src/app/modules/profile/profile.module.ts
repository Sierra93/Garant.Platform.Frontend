import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePageComponent } from './components/profile.page/profile.page.component';
import {RouterModule} from '@angular/router';
import {ProfileMyDataModule} from './profile-my-data/profile-my-data.component';
import {NotificationsModule} from './profile-requests/notifications.component';
import {ProfileDialogMessagesModule} from './profile-dialog-messages/profile-dialog-messages.component';
import {ProfileMyMessagesModule} from './profile-my-dialogs/profile-my-dialogs.component';
import {ProfileDataModule} from './profile-data/profile-data.component';
import {FormsModule} from '@angular/forms';
import {ManageAccountModule} from './manage-account/manage-account.component';
import {GarLibModule} from '../../gar-lib/gar-lib.module';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ToastModule} from 'primeng/toast';



@NgModule({
  declarations: [
    ProfilePageComponent,
    ProfileDataModule,
    ProfileMyDataModule,
    NotificationsModule,
    ProfileDialogMessagesModule,
    ProfileMyMessagesModule,
    ManageAccountModule
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ProfilePageComponent,
      children: [{
        path: 'my-data',
        component: ProfileMyDataModule
      }, {
        path: 'notifications',
        component: NotificationsModule
      }, {
        path: 'chat/dialogs/dialog',
        component: ProfileDialogMessagesModule,
        pathMatch: 'full'
      }, {
        path: 'chat/dialogs',
        component: ProfileMyMessagesModule,
        pathMatch: 'full'
      }]
    }]),
    FormsModule,
    GarLibModule,
    InputTextareaModule,
    ToastModule
  ]
})
export class ProfileModule { }
