import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'stringArrayToString'
})
export class StringArrayToStringPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
      if (value instanceof Array) {
        return (value as [any]).join(' ');
      } else {
        return value;
      }
  }
}
