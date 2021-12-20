/**
 * Класс входной модели документов.
 */
export class DocumentInput {
    // Id предмета сделки (франшизы или бизнеса).
    DocumentItemId: number = 0;

    // Флаг документа сделки.
    IsDealDocument: boolean = false;

    // Тип документа.
    DocumentType: string = "";
}