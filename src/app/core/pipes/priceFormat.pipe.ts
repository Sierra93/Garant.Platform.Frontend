import { Pipe, PipeTransform } from '@angular/core';

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
