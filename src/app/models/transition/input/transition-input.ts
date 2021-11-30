/**
 * Класс входной модели перехода.
 */
export class TransitionInput {
    // Тип перехода.
    TransitionType: string = "";

    // Id франшизы или готового бизнеса.
    ReferenceId: number = 0;

    // Id другого пользователя.
    OtherId: string = "";

    // Тип обсуждения.
    TypeItem: string = "";
}