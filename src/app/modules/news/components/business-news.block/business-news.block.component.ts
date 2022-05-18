import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { GarDestroyService } from "../../../../gar-lib/gar-destroy.service";
import { NewsService } from "../../news.service";
import { WINDOW } from "../../../../../environments/window/window.token";
import { WindowProvider } from "../../../../../environments/window/window.provider";
import { filter, map, shareReplay, switchMap, takeUntil, tap, withLatestFrom } from "rxjs/operators";
import { BehaviorSubject, combineLatest, of, ReplaySubject } from "rxjs";
import { KeyValue } from "@angular/common";
import { news } from "../../news";

@Component({
	selector: 'app-business-news-block',
	templateUrl: './business-news.block.component.html',
	styleUrls: ['./business-news.block.component.scss'],
	providers: [GarDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessNewsBlockComponent implements OnInit {
	
	/** Текущее состояние значений формы */
	private readonly formValue$ = new ReplaySubject<{sorting: KeyValue<string, string>; tags: {selected: boolean, tag: string}[]}>();
	
	/** Счетчик количества дополнительно открываемых карточек по нажатию на кнопку "Ещё" */
	private _count$ = new BehaviorSubject<number>(0);
	/**
	 * Количество отображаемых карточек по дефолту
	 *
	 * @remarks В зависимости от разрешения экрана
	 * */
	private readonly _initCount$ = this._window.width$.pipe(
		map(width => width > this._window.application.grades.tablet
			? 5
			: width > this._window.application.grades.tabletSmall
				? 3
				: 2
		)
	)
	/** Контролы для тегов */
	get tags(): AbstractControl[] {
		return (this.businessNews.form?.controls.tags as FormArray).controls;
	}
	
	/**
	 * Варианты для сортировки
	 *
	 * @remarks отсебятина
	 *
	 * TODO: обсудить с бэком получение массива свойств для сортировки
	 * */
	readonly soringProperties: KeyValue<string, string> [] = [{
		key: 'byPopularUp',
		value: 'По популярности'
	}, {
		key: 'byDateUp',
		value: 'По дате (сначала новые)'
	}, {
		key: 'byDateDown',
		value: 'По дате (сначала старые)'
	}]
	
	/** Модель формы */
	readonly businessNews = {
		form: null as unknown as FormGroup,
		model: {
			sorting: null
		}
	}
	
	/** Список новостей, полученных по запросу */
	readonly news$ = this._service.getBusinessNews().pipe(
		tap(items => {
			const _items = this._fb.array(Array.from(new Set(items
				.map(item => item['theme'])
				.filter(o => !!o)))
				.map(tag => ({
					selected: false,
					tag
				})))
			this.businessNews.form.addControl('tags', _items)
		}),
		shareReplay(1)
	)
	
	/** Список новостей, отсортированных по фильтру */
	readonly filteredNews$ = this.formValue$.pipe(
		filter(o => !!o),
		switchMap(formValue => combineLatest([
			of(formValue),
			this.news$,
			this._initCount$,
			this._count$
		])),
		map(([formValue, news, initCount, count]) => {
			const _selectedTags = formValue.tags.filter(t => t.selected).map(t => t.tag);
			const _filteredNews = news
				.filter(n => _selectedTags.length ? _selectedTags.includes(n.theme) : true)
				.slice(0, initCount + count);
			return formValue.sorting?.key
				? this.sortByKey(_filteredNews, formValue.sorting.key)
				: _filteredNews;
			
		})
	)
	
	constructor(
		private _fb: FormBuilder,
		private _service: NewsService,
		private _destroy$: GarDestroyService,
		@Inject(WINDOW)
		private _window: WindowProvider
	) {
		this.businessNews.form = this._fb.group(this.businessNews.model)
	}
	
	ngOnInit(): void {
		this.businessNews.form.valueChanges.pipe(
			takeUntil(this._destroy$)
		).subscribe(value => {
			this.formValue$.next(value)
		})
	}
	
	/** У
	 * Открываем ещё 2 карточки */
	increaseVisible(): void {
		this._count$.next(this._count$.getValue() + 2)
	}
	
	/** Сортировка по ключу */
	private sortByKey(items: news.IBusinessNewsBlockItem[], key: string): news.IBusinessNewsBlockItem[] {
		// @ts-ignore
		return items.sort((a, b): number => {
			switch (key) {
				case 'byDateUp':
					return +new Date(b.dateCreated) - +new Date(a.dateCreated)
				case 'byDateDown':
					return +new Date(a.dateCreated) - +new Date(b.dateCreated)
				case 'byPopularUp':
					return b.viewsCount - a.viewsCount
			}
		})
	}
}
