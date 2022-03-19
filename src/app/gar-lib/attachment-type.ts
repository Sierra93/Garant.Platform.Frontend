/** Перечисление поддерживаемых типов вложений к mime форматам загружаемых файлов */
export enum AttachmentType {
	png = 'image/png',
	gif = 'image/gif',
	webp = 'image/webp',
	bmp = 'image/bmp',
	pdf = 'application/pdf',
	doc = 'application/msword',
	docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	jpeg = 'image/jpeg',
	xls = 'application/vnd.ms-excel',
	xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	plain = 'text/plain,',
	sig = '.sig'
}
