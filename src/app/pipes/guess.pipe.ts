import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'guess'
})
export class GuessPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
