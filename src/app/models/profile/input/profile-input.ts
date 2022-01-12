/**
 * Класс входной модели профиля пользователя.
 */
export class ProfileInput {
    // Имя.
    FirstName: string = "";

    // Фамилия.
    LastName: string = "";

    // Почта.
    Email: string = "";

    // Номер телефона.
    PhoneNumber: string = "";

    // Дата рождения.
    DateBirth: Date = new Date();

    // Отчество.
    Patronymic: string = "";

    // Тип формы.
    TypeForm: string = "";

    // ИНН.
    Inn: number = 0;

    // Расчетный счет.
    Pc: number = 0;

    // Серия паспорта.
    PassportSerial: number = 0;

    // Номер паспорта.
    PassportNumber: number = 0;

    // Код.
    Code: string = "";

    // Дата выдачи паспорта.
    DateGive: Date = new Date();

    // Кем выдан.
    WhoGive: string = "";

    // Адрес регистрации.
    AddressRegister: string = "";

    // Банковский идентификационный код.
    Bik: number = 0;

    // Код причины постановки.
    Kpp: number = 0;

    // корр. счет.
    CorrAccountNumber: number = 0;

    // выбранный банк.
    DefaultBankName: string = '';
}
