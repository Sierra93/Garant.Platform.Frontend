/**
 * Класс входной модели сделки.
 */
export class DealInput {
    // Id предмета сделки (франшизы или бизнеса).
    DealItemId: number = 0;

    // Тип предмета сделки (франшиза или бизнес).
    OrderType: string = "";
}