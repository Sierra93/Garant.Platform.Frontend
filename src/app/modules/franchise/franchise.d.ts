export namespace franchise {
  /** Модель франшизы */
  export interface IItem {
    /** Описание деятельности. */
    activityDetail?: string;
    /** Год основания. */
    baseDate: number;
    /** Кол-во собственных предприятий. */
    businessCount: number;
    /** Категория (приходит UUID) - Категория франшизы */
    category?: string;
    /** Город (что за город???) */
    city: string;
    /** Комментарий причины отклонения. */
    commentRejection?: string;
    /** Что это??? */
    countDays: number;
    /** Дата создания франшизы */
    dateCreate: string;
    /** Что это??? */
    dayDeclination?: string;
    /** Кол-во точек.(каких точек???) */
    dotCount: number;
    /**
     * Список фин.показателей (json).
     *
     * TODO: перевести с JSON на массив!
     * */
    finIndicators: string;
    /** Идентификатор франшизы??? */
    franchiseId: number;
    /**
     * Пакеты франшизы (json).
     *
     * TODO: перевести с JSON на массив!
     * */
    franchisePacks: string;
    /** Полное имя чего??? */
    fullName: string;
    /** Что это за текст??? */
    fullText: string;
    /** Сумма общих инвестиций (включая паушальный взнос). */
    generalInvest: number;
    /**
     * Входит в инвестиции (json).
     *
     * TODO: перевести с JSON на массив!
     * */
    investInclude: string;
    /** Подтверждена ли карточка. */
    isAccepted: boolean;
    /** Покупка через гарант */
    isGarant: boolean;
    /** Отклонена ли карточка. */
    isRejected: boolean;
    /** Срок запуска (средний срок открытия бизнеса). */
    launchDate: number;
    /** Паушальный взнос (зависит от выбранного пакета). */
    lumpSumPayment: number;
    /** Что это??? */
    mode: string;
    /**
     * Название финансовых показателей (json).
     *
     * TODO: перевести с JSON на массив!
     * */
    nameFinIndicators: string;
    /** Название файла финансовой модели. */
    nameFinModelFile: string;
    /** Название фото франшизы. */
    nameFranchisePhoto: string;
    /** Название файла презентации. */
    namePresentFile: string;
    /** Окупаемость (средняя и планируемая). Кол-во мес. */
    payback: number;
    /** Описание расчета. */
    paymentDetail: string;
    /** Особенность франшизы. */
    peculiarity?: string;
    /** Стоимость */
    price: string;
    /** Месячная прибыль (планируемая чистая прибыль). */
    profitMonth: number;
    /** Желаемая прибыль в мес. */
    profitPrice: number;
    /**
     * Отзывы о франшизе (json).
     *
     * TODO: перевести с JSON на массив!
     * */
    reviews: string;
    /** Роялти (от валовой выручки). */
    royalty: number;
    /** Статус или должность. */
    status: string;
    /** Подкатегория франшизы */
    subCategory: string;
    /** Текст описания франшизы */
    text: string;
    /** Текст до цены */
    textDoPrice: string;
    /** Название (Заголовок) */
    title: string
    /** ??? */
    totalInvest: string;
    /** Описание обучения. */
    trainingDetails: string;
    /** Название фото обучения. */
    trainingPhotoName: string;
    /** Путь к изображению франшизы */
    url: string;
    /** Путь к изображению логотипа франшизы */
    urlLogo: string;
    /** Ссылка на видео о франшизе. */
    urlVideo: string;
    /** Массив с изображениями, которые связаны с изображением франшизы */
    urlsDetails: string[];
    /** Имя юзера или что??? */
    user: string;
    /** FK на Id пользователя создавшего франшизу. */
    userId: string;
    /** идентификатор, для чего??? - Вид бизнеса */
    viewBusiness: string;
    /** Год запуска */
    yearStart: number;
  }
}
