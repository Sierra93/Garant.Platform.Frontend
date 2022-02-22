export namespace attachment {
	export interface IAttachment {
		name: string | undefined;
		src: string | ArrayBuffer | null | undefined;
		file: File | undefined;
	}
}

/** Представление вложения */
export class Attachment implements attachment.IAttachment {
	public name: string | undefined;
	public src: string | ArrayBuffer | null | undefined;
	public file: File | undefined;
	public error: string | undefined;
	
	constructor(src: string | ArrayBuffer | null | undefined, file?: File) {
		this.src = src;
		this.file = file;
		this.name = file?.name;
	}
	
}
