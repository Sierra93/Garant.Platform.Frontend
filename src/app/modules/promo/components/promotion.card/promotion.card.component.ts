import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

/**
 * Компонент представления карточки с предложением
 *
 * @param action - Текст кнопки действия
 * @param reject - Текст кнопки отмены
 * @param link - Ссылка для перехода
 * */
@Component({
	selector: 'app-promotion-card',
	templateUrl: './promotion.card.component.html',
	styleUrls: ['./promotion.card.component.scss'],
	host: {
		class: 'gar-card promo',
		'[class.gar-hidden]': 'isHidden'
	},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionCardComponent {
	
	isHidden: boolean = false;
	
	/**
	 * Текст кнопки действия
	 *
	 * @remarks если не установлено, то кнопка не отображается
	 * */
	@Input('action')
	public action: string | undefined;
	/**
	 * Текст кнопки отмены
	 *
	 * @default по умолчанию текст 'Закрыть'
	 *
	 * @remarks можно передать null, в случае отсутствия контента кнопка не отображается
	 * */
	@Input('reject')
	public reject: string | undefined = 'Закрыть';
	/**
	 * Ссылка для перехода по клику на кнопку action
	 * */
	@Input('link')
	public link: string | undefined;
	
	onReject(): void {
		this.isHidden = true;
	}
	
}
