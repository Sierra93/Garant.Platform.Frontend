/**
 * Класс входной модели создания категории.
 */
export class CreateCategoryInput {
    // Код сферы (guid).
    SphereCode: string = "";

    // Название категории.
    CategoryName: string = "";

    // Тип категории.
    CategoryType: string = "";

    // Системное название.
    SysName: string = "";
}