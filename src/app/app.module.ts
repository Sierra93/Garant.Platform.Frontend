import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "popper.js/dist/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { APP_INITIALIZER, Inject, NgModule } from "@angular/core";
import { BrowserModule, Title } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";
import { TabViewModule } from "primeng/tabview";
import { RadioButtonModule } from "primeng/radiobutton";
import { PaginatorModule } from "primeng/paginator";
import { CommonDataService } from "./services/common/common-data.service";
import { ParamInterceptor } from "./interceptors/api-interceptor";
import { HeaderModule } from "./modules/header/header.component";
import { InputTextModule } from "primeng/inputtext";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CarouselModule } from "primeng/carousel";
import { MainPageModule } from "./modules/main-page/main-page.component";
import { CardModule } from "primeng/card";
import { InputSwitchModule } from "primeng/inputswitch";
import { SliderModule } from "primeng/slider";
import { StepsModule } from 'primeng/steps';
import { FooterModule } from "./modules/footer/footer.component";
import { LoginModule } from "./modules/login/login.component";
import { CheckboxModule } from "primeng/checkbox";
import { CatalogFranchiseModule } from "./modules/franchise/catalog-franchise/catalog-franchise.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CreateFranchiseModule } from "./modules/franchise/create-franchise/create-franchise.component";
import { ViewFranchiseModule } from "./modules/franchise/view-franchise/view-franchise.component";
import { EditFranchiseModule } from "./modules/franchise/edit-franchise/edit-franchise.component";
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from "primeng/api";
import { CreateReadyBusinessModule } from "./modules/business/create-ready-business/create-ready-business.component";
import { EditReadyBusinessModule } from "./modules/business/edit-ready-business/edit-ready-business.component";
import { ViewReadyBusinessModule } from "./modules/business/view-ready-business/view-ready-business.component";
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MainSearchModule } from "./modules/search/main-search/main-search.component";
import { CatalogBusinessModule } from "./modules/business/catalog-business/catalog-business.component";
import { GarantInitModule } from "./modules/garant/garant-init/garant-init.component";
import { DataService } from "./services/common/data-service";
import { GarantService } from "./services/garant/garant.service";
import { GarantConcordModule } from "./modules/garant/garant-concord/garant-concord.component";
import { GarantContractModule } from "./modules/garant/garant-contract/garant-contract.component";
import { GarantAcceptPaymentModule } from "./modules/garant/garant-accept-payment/garant-accept-payment.component";
import { FormatPriceGarantPipe } from "./core/pipes/formatPrice.pipe";
import { FranchiseLandingModule } from './modules/landing/franchise-landing/franchise-landing.component';
import { ConsultingLandingModule } from './modules/landing/consulting-landing/consulting-landing.component';
import { DealLandingModule } from "./modules/landing/deal-landing/deal-landing.component";
import { ConfiguratorAuthModule } from "./modules/configurator/configurator-auth/configurator-auth.component";
import { TabMenuModule } from 'primeng/tabmenu';
import { DocumentService } from "./services/garant/document.service";
import { CreateAdModule } from "./modules/create-ad/create-ad.component";
import { TableModule } from 'primeng/table';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { GarLibModule } from "./gar-lib/gar-lib.module";
import { SessionService } from "./core/session/session.service";
import { SESSION_TOKEN } from "./core/session/session.token";
import { NotifyService } from "./services/notify/notify.service";
import { LandingRequestService } from "./modules/landing/services/landing.service";
import { InputMaskModule } from 'primeng/inputmask';
import { ProductsModule } from "./modules/products/products.module";
import { NewsModule } from "./modules/news/news.module";
import { PromoModule } from "./modules/promo/promo.module";
import { WINDOW } from "../environments/window/window.token";
import { WindowProvider } from "../environments/window/window.provider";
import { NgxMetrikaModule } from "@kolkov/ngx-metrika";

@NgModule({
  declarations: [
    AppComponent,
    HeaderModule,
    MainPageModule,
    FooterModule,
    LoginModule,
    CatalogFranchiseModule,
    CreateFranchiseModule,
    ViewFranchiseModule,
    EditFranchiseModule,
    CreateReadyBusinessModule,
    EditReadyBusinessModule,
    ViewReadyBusinessModule,
    MainSearchModule,
    CatalogBusinessModule,
    GarantInitModule,
    FormatPriceGarantPipe,
    GarantConcordModule,
    GarantContractModule,
    GarantAcceptPaymentModule,
    FranchiseLandingModule,
    ConsultingLandingModule,
    DealLandingModule,
    ConfiguratorAuthModule,
    CreateAdModule
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
		AvatarGroupModule,
		ReactiveFormsModule,
		TabMenuModule,
		StepsModule,
		TableModule,
		NgHttpLoaderModule.forRoot(),
		GarLibModule,
		InputMaskModule,
		ProductsModule,
		NewsModule,
		PromoModule,
		NgxMetrikaModule.forRoot()
	],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    {
      provide: SESSION_TOKEN,
      useClass: SessionService
    },
    CommonDataService,
    GarantService,
    DataService,
    Title,
    MessageService,
    DocumentService,
    NotifyService,
    LandingRequestService,
    {
      provide: APP_INITIALIZER,
      useFactory: (notifyService: NotifyService) => () => notifyService.initiateSignalrConnection(),
      deps: [NotifyService],
      multi: true,
    },
	{
	  provide: WINDOW,
	  useClass: WindowProvider
	}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
	constructor(
		@Inject(WINDOW)
		private _window: WindowProvider
	) {
		this._window.application.grades = {
			phone: 767,
			tabletSmall: 768,
			tablet: 1024,
			desktop: 1440
		};
	}
}
