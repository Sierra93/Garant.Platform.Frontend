import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AttachmentType } from "../attachment-type";
import { Attachment, attachment } from "../attachment";
import { catchError, filter, map, switchMap, takeUntil, tap } from "rxjs/operators";
import { GarDestroyService } from "../gar-destroy.service";
import { API_URL } from "../../core/core-urls/api-url";
import { HttpClient } from "@angular/common/http";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

const DEFAULT_IMG_TYPES = [AttachmentType.png, AttachmentType.jpeg, AttachmentType.gif, AttachmentType.bmp, AttachmentType.webp];

/**
 * Компонент загрузки файлов
 *
 * Независимо отправляет загружаемый контент на сервер
 *
 * При смене порядка файлов (drag & drop) перезаписывает порядок файлов в списке
 *
 * Есть возможность установить ограничение по загружаемым форматам файлов
 *
 * */
@Component({
	selector: 'gar-img-uploader',
	templateUrl: './gar-img-uploader.component.html',
	styleUrls: ['./gar-img-uploader.component.scss'],
	providers: [GarDestroyService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GarImgUploaderComponent implements OnInit {
	
	private _items: attachment.IAttachment[] = [];
	private _items$ = new BehaviorSubject<attachment.IAttachment[]>([]);
	
	/** По умолчанию пока устанавливаем разрешенными для загрузки только графические изображения */
	private _allowTypes$ = new BehaviorSubject<AttachmentType[]>([]);
	
	/** Входящие файлы (загруженные ранее) */
	@Input('existing')
	set existingFiles(files: string[]) {
		if (files?.length) {
			files.forEach(src => this._items.push(new Attachment(src)));
			this._items$.next(this._items);
		}
	}
	
	/**
	 * Поддерживаемые типы загружаемых файлов
	 * */
	@Input('types')
	private set _allowTypes(value: AttachmentType[]) {
		this._allowTypes$.next(value);
	}
	
	/**
	 * Максимальное количество загружаемых файлов
	 *
	 * @default 10
	 * */
	@Input('maxUpload')
	public maxUpload: number = 10;
	
	@Output('upload')
	public upload = new EventEmitter<string[]>();
	
	@ViewChild('fileInput')
	private _input?: ElementRef;
	
	public items$ = this._items$.asObservable();
	
	public errors: { file: string; message: string }[] = [];
	
	constructor(
		private _destroy$: GarDestroyService,
		private _http: HttpClient
	) {
	}
	
	ngOnInit(): void {
		this._items$.pipe(
			filter(o => !!o && !!o.length),
			map(items => items.map(f => f.src)),
			takeUntil(this._destroy$)
		).subscribe(items => this.upload.next(items as string[]));
	}
	
	onChange(event: Event): void {
		const target = event.target as HTMLInputElement;
		if (!target.files?.length) {
			return;
		}
		try {
			of(target.files).pipe(
				switchMap(files => of(Object.values(files as unknown as File[]))),
				map(files => files.filter(file => {
					if (!this.allowFile(file)) {
						this.errors.push({
							file: file.name,
							message: 'Неверный формат файла'
						})
					}
					return this.allowFile(file);
				})),
				map(files => files.filter((f, i) => i < this.maxUpload)),
				filter(o => !!o),
				switchMap(files => this.uploadPhotos(files)),
				takeUntil(this._destroy$)
			).subscribe(files => {
				files.forEach(file => {
					this._items.push(new Attachment(file));
					this._items$.next(this._items);
				});
			})
		} finally {
			target.value = '';
		}
	}
	
	private allowFile(file: File): boolean {
		const _allowTypes = this._allowTypes$.getValue();
		return !_allowTypes.length
			|| _allowTypes.includes(file.type as AttachmentType);
	}
	
	private uploadPhotos(files: File[]): Observable<string[]> {
		try {
			const formData: FormData = new FormData();
			files.forEach(file => {
				formData.append('files', file)
			})
			
			return this._http.post<string[]>(API_URL.apiUrl.concat("/franchise/temp-file"), formData).pipe(
				tap(response => {
					console.log("Загруженные файлы в компоненте загрузки фотографий:", response);
				}),
				catchError(err => {
					throw new Error(err)
				})
			)
		} catch (e: any) {
			throw new Error(e);
		}
	};
	
	
	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this._items, event.previousIndex, event.currentIndex);
		this._items$.next(this._items)
	}
	
	remove(src: string | ArrayBuffer) {
		const index = this._items.map(f => f.src).indexOf(src);
		this._items.splice(index, 1);
		this._items$.next(this._items);
	}
}
