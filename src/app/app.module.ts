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
import { HeaderModule } from "./modules/header/header";
import { InputTextModule } from "primeng/inputtext";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CarouselModule } from "primeng/carousel";
import { MainPageModule } from "./modules/main-page/main-page";
import { ProductService } from "./services/productservice";
import { CardModule } from "primeng/card";


@NgModule({
  declarations: [
    AppComponent,
    HeaderModule,
    MainPageModule
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
    CardModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    CommonDataService,
    Title,
    ProductService
  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
