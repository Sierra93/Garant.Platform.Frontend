/**
 * Класс входной модели для авторизации сотрудника сервиса.
 */
export class ConfiguratorAuthInput {
    // Email или телефон.
    InputData: string = "";

    // Пароль.
    Password: string = "";
}