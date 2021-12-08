/**
 * Класс входной модели инита Гаранта.
 */
export class GarantInitInput {
    // Id бизнеса или франшизы.
    OriginalId: number = 0;

    // Тип заказа (франшиза или бизнес).
    OrderType: string = "";
}