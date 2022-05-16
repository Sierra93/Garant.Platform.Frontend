export namespace environment {
	/** Расширенный интерфейс Window для приложения */
	export interface IApplicationWindow extends Window {
		/** Параметры сетки приложения */
		grades: { [grade: string]: number };
	}
}
