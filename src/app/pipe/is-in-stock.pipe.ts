import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isInStock',
})
export class IsInStockPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return value > 0 ? 'In Stock' : 'Out of Stock';
  }
}
