/**
 * Класс входной модели проверки статуса платежа.
 */
export class GetPaymentStateInput {
    // Id платежа в система банка.
    PaymentId: string = "";

    // Id заказа в сервисе Гарант. 
    OrderId: number = 0;

    ItemDealId: number = 0;

    DealItemType: string = "";
}