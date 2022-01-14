import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
    dialogId: number = 0;

    // Id другого пользователя.
    otherId: string = "";

    // Флаг оплаты акта покупателем.
    isPayCustomerAct: boolean = false;
}