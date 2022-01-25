/**
 * Класс входной модели для оплаты итерации этапа.
 */
export class PaymentIterationCustomerInput {
    // Id предмета сделки (франшизы или бизнеса).
    OriginalId: number = 0;

    // Тип документа (по дефолту акт продавца без итерации).
    OrderType: string = "DocumentCustomerAct";

    // Номер итерации.
    Iteration: number = 1;
}