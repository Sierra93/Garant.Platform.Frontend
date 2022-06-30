/**
 * Класс входной модели для создания заявки бизнеса.
 */
 export class RequestBusinessInput {
    // Имя пользователя.
    UserName: string = "";

    // Телефон.
    Phone: string = "";

    // Почта
    Mail: string = "";

    // Id бизнеса.
    BusinessId: number = 0;
}