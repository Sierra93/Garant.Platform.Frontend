/**
 * Класс входной модели для создания или обновления франшизы.
 */
export class CreateUpdateFranchiseInput {
    // Путь к изображению.
    UrlsFranchise?: string;

    // Файлы изображений франшизы.
    UrlsDetails?: FormData;

    // Файл логотипа франшизы.
    // fileLogo?: FormData;

    // Заголовок.
    Title?: string;

    // Текст описания.
    Text?: string;

    // Цена.
    Price?: number;

    // Дата создания.
    DateCreate?: Date;

    // Категория франшизы.
    Category?: string;

    // Подкатегория.
    SubCategory?: string

    // Вид бизнеса.
    ViewBusiness?: string;

    // Покупка через гарант.
    IsGarant: boolean = false;

    // Желаемая прибыль в мес.
    ProfitPrice?: number;

    // Статус или должность.
    Status?: string;

    // Сумма общих инвестиций (включая паушальный взнос).
    GeneralInvest?: number;

    // Паушальный взнос (зависит от выбранного пакета).
    LumpSumPayment?: number;

    // Роялти (от валовой выручки).
    Royalty?: number;

    // Окупаемость (средняя и планируемая). Кол-во мес.
    Payback?: number;

    // Месячная прибыль (планируемая чистая прибыль).
    ProfitMonth?: number;

    // Срок запуска (средний срок открытия бизнеса).
    LaunchDate?: number;

    // Описание деятельности.
    ActivityDetail?: string;

    // Входит в инвестиции (json).
    InvestInclude?: string;

    // Год основания.
    BaseDate?: number;

    //  Год запуска.
    YearStart?: number;

    // Кол-во точек.
    DotCount?: number;

    // Кол-во собственных предприятий.
    BusinessCount?: number;

    // Особенность франшизы.
    Peculiarity?: string;

    // Файл финансовой модели.
    FinModelFile?: FormData;

    // Файл презентации.
    PresentFile?: FormData;

    // Фото франшизы.
    FranchisePhoto?: FormData;

    // Описание расчета.
    PaymentDetail?: string;

    // Название финансовых показателей.
    NameFinIndicators?: string;

    // Список фин.показателей (json).
    FinIndicators?: string;

    // Описание обучения.
    TrainingDetails?: string;

    // Фото обучения.
    TrainingPhoto?: FormData;

    // Пакеты франшизы (json).
    FranchisePacks?: string;

    // Ссылка на видео о франшизе.
    UrlVideo?: string;

    // Отзывы о франшизе (json).
    Reviews?: string;

    // Новая ли франшиза.
    IsNew?: boolean;

    // Id франшизы.
    FranchiseId: number = 0;
}