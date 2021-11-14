import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";
import { TabViewModule } from "primeng/tabview";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { PaginatorModule } from "primeng/paginator";
import { CommonDataService } from "./services/common-data.service";
import { ParamInterceptor } from "./api-interceptor";
import { HeaderModule } from "./modules/header/header.component";
import { InputTextModule } from "primeng/inputtext";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CarouselModule } from "primeng/carousel";
import { MainPageModule } from "./modules/main-page/main-page.component";
import { CardModule } from "primeng/card";
import { InputSwitchModule } from "primeng/inputswitch";
import { SliderModule } from "primeng/slider";
import { FooterModule } from "./modules/footer/footer.component";
import { LoginModule } from "./modules/login/login.component";
import { ProfileDataModule } from "./modules/profile-data/profile-data.component";
import { CheckboxModule } from "primeng/checkbox";
import { CatalogFranchiseModule } from "./modules/catalog-franchise/catalog-franchise.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CreateFranchiseModule } from "./modules/create-franchise/create-franchise.component";
import { ViewFranchiseModule } from "./modules/view-franchise/view-franchise.component";
import { EditFranchiseModule } from "./modules/edit-franchise/edit-franchise.component";
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from "primeng/api";
import { CreateReadyBusinessModule } from "./modules/create-ready-business/create-ready-business.component";
import { EditReadyBusinessModule } from "./modules/edit-ready-business/edit-ready-business.component";
import { ViewReadyBusinessModule } from "./modules/view-ready-business/view-ready-business.component";
import { CreateAdModule } from "./modules/create-ad/create-ad.component";
import { ProfileModule } from "./modules/profile/profile.component";
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@NgModule({
  declarations: [
    AppComponent,
    HeaderModule,
    MainPageModule,
    FooterModule,
    LoginModule,
    ProfileDataModule,
    CatalogFranchiseModule,
    CreateFranchiseModule,
    ViewFranchiseModule,
    EditFranchiseModule,
    CreateReadyBusinessModule,
    EditReadyBusinessModule,
    ViewReadyBusinessModule,
    CreateAdModule,
    ProfileModule
  ],

  entryComponents: [],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    TabViewModule,
    DropdownModule,
    PaginatorModule,
    RadioButtonModule,
    InputTextModule,
    AutoCompleteModule,
    CarouselModule,
    CardModule,
    InputSwitchModule,
    SliderModule,
    CheckboxModule,
    BreadcrumbModule,
    FileUploadModule,
    GalleriaModule,
    InputTextareaModule,
    AvatarModule,
    AvatarGroupModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    CommonDataService,
    Title,
    MessageService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
