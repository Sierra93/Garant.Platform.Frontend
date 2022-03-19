export class ArticleInput {
    // Id блога, к которому нужно привязать статью.
    BlogId: number = 0;

    // Заголовок статьи.
    Title: string = "";

    // Описание статьи.
    Description: string = "";

    // Основной текст статьи.
    Text: string = "";

    // Код названия темы.
    ThemeCode: string = "";

    // Подпись.
    SignatureText: string = "";
}