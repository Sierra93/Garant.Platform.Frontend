import { Observable } from "rxjs";

export namespace session {
	/** Сервис работы с текущей сессией */
	export interface ISessionProvider {
		/** Инициализация сессии, выполняется при запуске приложения */
		initSession(): void;
		
		/** Старт сессии, выполняется при успешной авторизации/обновлении токена */
		startSession(): void;
		
		/** Окончание сессии, выполняется при логауте/протухании токена сессии и невозможности его обновить */
		endSession(): void;
		
		/** Сохранение абстрактных данных в хранилище (ключ/значение) */
		updateDataItem(key: string, value: string): void;
		
		/** Получение данных по ключу */
		getDataItem(key: string): string | null;
		
		/** Удаление данных по ключу */
		removeDataItem(key: string): void;
		
		/** Запись токена */
		setToken(token: { token: string }): void;
		
		/** Флаг проверки залогиненного юзера */
		isLogin$: Observable<boolean>;
		
		/** Проверка наличия accessToken */
		isUserHaveAccess: boolean;
	}
}
