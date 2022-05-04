import {
	Component,
	ChangeDetectionStrategy,
	ElementRef,
	ViewChild,
	QueryList,
	AfterViewInit,
	Input,
	ViewChildren,
	ViewContainerRef,
	ComponentFactoryResolver,
	ComponentFactory, ChangeDetectorRef, EventEmitter, HostListener
} from '@angular/core';
import { GarCarouselItemDirective } from "./gar-carousel-item.directive";
import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { ComponentType } from "@angular/cdk/overlay";
import {
	debounceTime,
	delay,
	filter,
	map,
	shareReplay,
	startWith,
	switchMap,
	takeUntil,
	tap
} from "rxjs/operators";
import { GarDestroyService } from "../gar-destroy.service";
import { GarItemComponent } from "../gar-item/gar-item.component";

/**
 * Компонент карусель
 *
 * @param items - массив данных, по которому карусель выводит список своих элементов
 *
 * @param template - компонент, который является представлением, выводящегося в качестве элемента
 * */
@Component({
	selector: 'gar-carousel',
	templateUrl: './gar-carousel.component.html',
	styleUrls: ['./gar-carousel.component.scss'],
	providers: [GarDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarCarouselComponent<T> implements AfterViewInit {
	
	private readonly _items$ = new ReplaySubject<Array<T>>();
	private readonly _scrollChanged$ = new EventEmitter();
	private readonly _heightContainer$ = new BehaviorSubject('100%');
	
	slidesIndex = 0;

	@ViewChild('slides')
	slidesContainer: ElementRef | undefined;
	@ViewChildren(GarCarouselItemDirective, {read: ElementRef})
	items: QueryList<ElementRef> | undefined;
	@ViewChildren('sliderItem', {read: ViewContainerRef})
	viewRefs: QueryList<ViewContainerRef> | undefined;
	@HostListener('window:resize')
	private handlerResize() {
		this._scrollChanged$.next();
	}
	
	readonly items$: Observable<Array<T>> = this._items$;
	
	/**
	 * Массив данных, на основании которых заполняется котентом карусель
	 * */
	@Input('items')
	set _items(value: Array<T>) {
		this._items$.next(value);
	}
	
	/**
	 * Инстанс класса (компонента), который является единицей в карусели
	 *
	 * @remarks компонент должен иметь входное свойство item
	 * */
	@Input()
	template: ComponentType<GarItemComponent<T>> | undefined;
	
	get currentItem(): ElementRef<HTMLDivElement> | undefined {
		return this.items!.find((item, index) => index === this.slidesIndex);
	}
	
	readonly leftDisabled$ = this._scrollChanged$.pipe(
		startWith(true),
		// Задержка, так как представление по событию скрола не происходит сразу
		debounceTime(300),
		map(_ => this.items!.toArray()[0].nativeElement.getBoundingClientRect().left === this.slidesContainer!.nativeElement.getBoundingClientRect().left),
		tap(() => this._cdr.detectChanges())
	);
	
	readonly rightDisabled$ = this._scrollChanged$.pipe(
		startWith(true),
		// Задержка, так как представление по событию скрола не происходит сразу
		debounceTime(300),
		map(_ => this.items!.toArray()[this.items!.length - 1].nativeElement.getBoundingClientRect().right === this.slidesContainer!.nativeElement.getBoundingClientRect().right),
		tap(() => this._cdr.detectChanges())
	);
	
	readonly heightContainer$: Observable<string> = this._heightContainer$.pipe(
		shareReplay(1),
	)
	
	constructor(
		private _cfr: ComponentFactoryResolver,
		private _destroy$: GarDestroyService,
		private _cdr: ChangeDetectorRef
	) {
	}
	
	ngAfterViewInit() {
		this.viewRefs?.changes.pipe(
			switchMap(_ => this._items$),
			filter(items => !!items?.length),
			takeUntil(this._destroy$)
		).subscribe(items => {
			items.forEach((item, index) => {
				const _factory: ComponentFactory<GarItemComponent<T>> = this._cfr.resolveComponentFactory(this.template!);
				const componentFactory  = this.viewRefs!.find((el, i) => i === index)!.createComponent(_factory);
				componentFactory.instance.item = item;
				componentFactory?.changeDetectorRef.detectChanges();
			})
			this._heightContainer$.next(`${this.currentItem!.nativeElement.clientHeight + 15}px`);
			this._cdr.detectChanges();
		});
	}
	
	onClickLeft() {
		this.slidesContainer!.nativeElement.scrollLeft -= this.currentItem!.nativeElement.offsetWidth + 24;
		if (this.slidesIndex > 0) {
			this.slidesIndex--;
		}
		this._scrollChanged$.next();
	}
	
	onClickRight() {
		this.slidesContainer!.nativeElement.scrollLeft += this.currentItem!.nativeElement.offsetWidth + 24;
		if (this.slidesIndex < this.items!.length - 1) {
			this.slidesIndex++
		}
		this._scrollChanged$.next();
	}
	
}
