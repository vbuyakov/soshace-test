import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mongoid'
})
export class MongoidPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let id: string = String(value);
    if (id.length <= 6) return id;
    return id.substr(0, 2) + '...' + id.substr(id.length-4, 4);

  }

}
