import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multiply'
})
export class MultiplyPipe implements PipeTransform {

  public transform(value: any, ...args: any[]): any {
    return value * 2.5;
  }
}
