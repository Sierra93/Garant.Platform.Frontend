import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertStringToNumber'
})
export class ConvertStringToNumberPipe implements PipeTransform {
    transform(value: string, args?: any): any {        
        if (!value) {
            return null;
        }

        return +value;
    };
}