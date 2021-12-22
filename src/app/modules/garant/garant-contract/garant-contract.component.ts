import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { API_URL } from "src/app/core/core-urls/api-url";
import { DocumentInput } from "src/app/models/document/input/document-input";
import { DealInput } from "src/app/models/garant/input/deal-input";
import { CommonDataService } from "src/app/services/common/common-data.service";
import { DataService } from "src/app/services/common/data-service";
import { GarantService } from "src/app/services/garant/garant.service";

@Component({
    selector: "garant-contract",
    templateUrl: "./garant-contract.component.html",
    styleUrls: ["./garant-contract.component.scss"]
})

/** 
 * Класс модуля Гаранта (страница согласования договора 3 этап).
 */
export class GarantContractModule implements OnInit {    
    oInitData: any = {};
    aMessages: any = [];
    dateStartDialog: string = "";
    chatItemName: string = "";
    message: string = "";
    dialogId: number = 0;
    aInvestInclude: any = [];
    aIterationList: any = [];
    documentFile: any;
    attachmentVendorFileName: string = "";
    attachmentCustomerFileName: string = "";
    isSend: boolean = false;
    isApproveVendorDocment: boolean = false;
    isApproveCustomerDocument: boolean = false;

    constructor(private http: HttpClient, 
        private commonService: CommonDataService,
        private garantService: GarantService,
        private router: Router,
        private dataService: DataService) {

    };

    public async ngOnInit() {
        await this.initGarantDataAsync();
        await this.getAttachmentDocumentNameVendorDealAsync();
        await this.getAttachmentDocumentNameCustomerDealAsync();
        await this.onCheckApproveDocumentVendorAsync();
        await this.onCheckApproveDocumentCustomerAsync();
    };    

    /**
     * Функция получит данные Гаранта на ините.
     * @returns Данные инита страницы.
     */
    private async initGarantDataAsync() {
        try {           
            await this.garantService.initGarantDataAsync(3, true, this.dataService.otherId).then((response: any) => {
                this.oInitData = response;                
                this.aMessages = response.chatData.messages;
                this.dateStartDialog = response.chatData.dateStartDialog;
                this.chatItemName = response.chatData.chatItemName;
                this.aInvestInclude = JSON.parse(response.investInclude);

                console.log("garant init data stage 3: ", this.oInitData);
                console.log("aInvestInclude: ", this.aInvestInclude);
            });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит продажу в сделке.
     */
    public async onAcceptDealAsync() {
        try {            
            let dataInput = new DealInput();

            if (this.oInitData !== null && this.oInitData !== undefined) {
                dataInput.DealItemId = this.oInitData.itemDealId;
                dataInput.OrderType = this.oInitData.itemDealType;
            }            

            await this.http.post(API_URL.apiUrl.concat("/garant/accept-deal"), dataInput)
                .subscribe({
                    next: (response: any) => {
                        console.log(response);
                    },

                    error: (err) => {
                        this.commonService.routeToStart(err);
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };    

    // TODO: Вынести в общий сервис сообщений, как только он будет создан.
    public async onSendMessageAsync() {
        console.log("Сообщение", this.message);

        try {                
            await this.http.post(API_URL.apiUrl.concat("/chat/send-message"), {
                Message: this.message,
                DialogId: this.dialogId
            })
                .subscribe({
                    next: (response: any) => {
                        console.log("Сообщения: ", response.messages);
                        this.aMessages = response.messages; 
                        this.dataService.dialogId = response.dialogId;      
                        this.message = "";                 
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция прикрепит и отправит файл договора продавца.
     * @param e - Данные документа.
     */
    public async onAttachmentVendorDocument(e: any) {
        console.log("onAttachmentVendorDocument", e);
        this.documentFile = e.target.files[0];
        
        if (e.target.files.length > 0) {
            await this.attachmentDealVendorDocumentAsync();
        }
    };

    /**
     * Функция прикрепит и отправит файл договора покупателя.
     * @param e - Данные документа.
     */
    public async onAttachmentCustomerDocument(e: any) {
        console.log("onAttachmentCustomerDocument", e);
        this.documentFile = e.target.files[0];
        
        if (e.target.files.length > 0) {
            await this.attachmentDealCustomerDocumentAsync();
        }
    };    

    /**
     * Функция прикрепит документ договора продавца к сделке.
     */
    private async attachmentDealVendorDocumentAsync() {
        try {                
            let formData = new FormData();
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentVendor";
            documentInput.IsDealDocument = true;
            
            formData.append("files", this.documentFile);      
            formData.append("documentData", JSON.stringify(documentInput));

            await this.http.post(API_URL.apiUrl.concat("/document/attachment-vendor-document-deal"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Документ сделки: ", response);                                  
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция прикрепит документ договора покупателя к сделке.
     */
     private async attachmentDealCustomerDocumentAsync() {
        try {                
            let formData = new FormData();
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentCustomer";
            documentInput.IsDealDocument = true;
            
            formData.append("files", this.documentFile);      
            formData.append("documentData", JSON.stringify(documentInput));

            await this.http.post(API_URL.apiUrl.concat("/document/attachment-customer-document-deal"), formData)
                .subscribe({
                    next: (response: any) => {
                        console.log("Документ сделки: ", response);                                  
                    },

                    error: (err) => {
                        throw new Error(err);
                    }
                });
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция отправит договор продавца.
     * @returns - Результат отправки.
     */
    public async onSendDocumentVendorAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentVendor";
            documentInput.IsDealDocument = true;                    

            if (documentInput.DocumentItemId > 0) {
                return await this.http.post(API_URL.apiUrl.concat("/document/send-vendor-document-deal"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Отправка документа: ", response);

                            if (response) {
                                this.isSend = true;
                            }
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }

            return false;
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит название файла для согласования покупателю.
     */
    private async getAttachmentDocumentNameVendorDealAsync() {
        try {        
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-attachment-document-vendor-deal-name"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            this.attachmentVendorFileName = response.documentName;
                            console.log("Название документа: ", response.documentName);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция получит название файла для согласования продавцу.
     */
     private async getAttachmentDocumentNameCustomerDealAsync() {
        try {        
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/get-attachment-document-customer-deal-name"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            this.attachmentCustomerFileName = response.documentName;
                            console.log("Название документа: ", response.documentName);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция проверит, подтвердил ли покупатель догововор продавца.
     */
    private async onCheckApproveDocumentVendorAsync() {
        try {
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/check-approve-document-vendor"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveVendorDocment = true;
                            }
                           
                            console.log("approve document vendor: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

     /**
     * Функция проверит, подтвердил ли продавец догововор покупателя.
     */
      private async onCheckApproveDocumentCustomerAsync() {
        try {
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;

            if (documentInput.DocumentItemId > 0 && documentInput.DocumentItemId !== null) {
                await this.http.post(API_URL.apiUrl.concat("/document/check-approve-document-customer"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveCustomerDocument = true;
                            }
                           
                            console.log("approve document customer: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    public async onSendDocumentCustomerAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;
            documentInput.DocumentType = "DocumentCustomer";
            documentInput.IsDealDocument = true;                    

            if (documentInput.DocumentItemId > 0) {
                return await this.http.post(API_URL.apiUrl.concat("/document/send-customer-document-deal"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            console.log("Отправка документа: ", response);

                            if (response) {
                                this.isSend = true;
                            }
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }

            return false;
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит договор продавца.
     */
    public async onApproveVendorDocumentAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;            

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/approve-document-vendor"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveVendorDocment = true;
                            }

                            console.log("approve vendor: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };

    /**
     * Функция подтвердит договор покупателя.
     */
     public async onApproveCustomerDocumentAsync() {
        try {                
            let documentInput = new DocumentInput();
            documentInput.DocumentItemId = this.oInitData.itemDealId;            

            if (documentInput.DocumentItemId > 0) {
                await this.http.post(API_URL.apiUrl.concat("/document/approve-document-customer"), documentInput)
                    .subscribe({
                        next: (response: any) => {
                            if (response) {
                                this.isApproveCustomerDocument = true;
                            }

                            console.log("approve customer: ", response);
                        },

                        error: (err) => {
                            throw new Error(err);
                        }
                    });
            }
        }

        catch (e: any) {
            throw new Error(e);
        }
    };
}