import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

export namespace gar {
	export namespace lib {
		export interface IFieldComponent<T> {
			/**
			 * Значение
			 */
			value: T | null;
			/**
			 * поле определяющее заголовок компонента
			 */
			title$: Subject<string>;
			/**
			 * поле позволяющее влиять на состояние ошибочности в обход formControl'а
			 *
			 * @remarks
			 * - не является основным и рекомендованным способом подключения
			 */
			invalid$: Subject<boolean>;
			/**
			 * флаг доступности поля для редактирования и фокуса
			 */
			readonly$: Subject<boolean>;
			/**
			 * событие при изменении значения
			 */
			changed: EventEmitter<T | null>;
			
		}
	}
}
