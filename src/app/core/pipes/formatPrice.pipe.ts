import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {
    transform(value: any, args?: any): any {        
        console.log("formatPrice");
        if (!value) {
            return null;
        }

        return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    };
}