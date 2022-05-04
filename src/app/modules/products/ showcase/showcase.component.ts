import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonDataService } from "../../../services/common/common-data.service";
import { GarDestroyService } from "../../../gar-lib/gar-destroy.service";
import { CatalogShortCardComponent } from "../catalog/catalog.short.card/catalog.short.card.component";
import { shareReplay, takeUntil, tap } from "rxjs/operators";

/**
 * Компонент представления повторяющихся блоков с промо информацией
 *
 * TODO: подумать и сделать конфигурируемым
 * */
@Component({
	selector: 'app-showcase',
	templateUrl: './showcase.component.html',
	styleUrls: ['./showcase.component.scss'],
	providers: [GarDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseComponent {
	
	/** Компонент, передаваемый в карусель */
	cardComponent = CatalogShortCardComponent;
	
	/** список популярных франшиз */
	readonly aPopularFranchises$ = this.commonService.getPopularFranchise().pipe(
		shareReplay(1),
		tap(data => console.log('Популярные франшизы:', data)),
		takeUntil(this._destroy$)
	)
	/**
	 * список последних бизнесов
	 * */
	readonly aNewBusiness$ = this.commonService.getNewBusiness().pipe(
		shareReplay(1),
		takeUntil(this._destroy$)
	)
	
	constructor(
		private commonService: CommonDataService,
		private _destroy$: GarDestroyService
	) {
	}
	
}
