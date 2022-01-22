/**
 * Класс входной модели для создания заявки франшизы.
 */
export class RequestFranchiseInput {
    // Имя пользователя.
    UserName: string = "";

    // Телефон.
    Phone: string = "";

    // Город.
    City: string = "";

    // Id франшизы.
    FranchiseId: number = 0;
}