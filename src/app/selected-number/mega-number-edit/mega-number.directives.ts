import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'displayMega'})
export class MegaNumberDirective implements PipeTransform {
    transform(value: any, ...args: any[]): string {
        if (!value) {
            return "Mega Number....";
        } else {
            return value;
        }
    }

    

}