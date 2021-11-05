export class CreateUpdateBusinessInput {
    // Название бизнеса.
    BusinessName: string = "";

    // Массив с названиями изображений бизнеса.
    UrlsBusiness: string[] = [];

    // Статус или должность.
    Status: string = "";

    Price: number = 0;

    // Сумма оборота.
    TurnPrice: number = 0;

    // Желаемая прибыль в мес.
    ProfitPrice: number = 0;

    // Окупаемость (средняя и планируемая). Кол-во мес.
    Payback: number = 0;

    // Рентабельность.
    Profitability: number = 0;

    // Возраст бизнеса.
    BusinessAge: number = 0;

    // Входит в стоимость (json).
    InvestPrice: string = "";

    // Описание готового бизнеса.
    Text: string = "";

    // Кол-во сотрудников в год.
    EmployeeCountYear: number = 0;

    // Форма.
    Form: string = "";

    // Доля с продажи.
    Share: number = 0;

    // Ссылка на сайт.
    Site: string = "";

    // Описание деятельности бизнеса.
    ActivityDetail: string = "";

    // Название фото деятельнотси бизнеса.
    ActivityPhotoName: string = "";

    // Особенность бизнеса.
    Peculiarity: string = "";

    // Активы.
    Assets: string = "";

    // Причины продажи.
    ReasonsSale: string = "";

    // Адрес бизнеса.
    Address: string = "";

    // Ссылка на видео о бизнесе.
    UrlVideo: string = "";

    // Флаг продажи через гарант
    IsGarant: boolean = false;

    Category: string = "";

    SubCategory: string = "";

    IsNew: boolean = false;
}