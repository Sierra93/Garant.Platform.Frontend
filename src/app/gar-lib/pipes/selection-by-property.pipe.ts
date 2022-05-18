import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectionByProperty'
})
export class SelectionByPropertyPipe implements PipeTransform {

  transform(value: any, property: string): any[] | any {
    if (!value || !Array.isArray(value)) {
      return value;
    }
    console.log(new Set(value.map(item => item[property]).filter(o => !!o)))
    return Array.from(new Set(value.map(item => item[property]).filter(o => !!o)));
  }
}
