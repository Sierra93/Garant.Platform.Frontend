export namespace news {
	export interface INewsBlockItem {
		date: string;
		dateCreated: string;
		isPaid: false;
		newsId: number;
		position: number;
		text: string;
		time: string;
		title: string;
		type: string;
		url: string;
		viewsCount: number;
	}
	
	/**
	 * Модель для Новостей делового мира (с фильтром)
	 *
	 * TODO: полная отсебятина для показа, обсудить с бэком в дальнейшем
	 * */
	export interface IBusinessNewsBlockItem extends INewsBlockItem {
		theme: string;
	}
}
