import { Pipe, PipeTransform } from '@angular/core';

/**
 * @deprecated удалить на фронте преобразователи данных, всё форматировать на бэке
 * */
@Pipe({
  name: 'priceFormat',
})
export class PriceFormatPipe implements PipeTransform {
  transform(stringPriceGarant: any, ...args: any[]): any {
    if (!stringPriceGarant) {
      return undefined;
    }

    return stringPriceGarant.toString().replace(/[,]/g, ' ');
  }
}
