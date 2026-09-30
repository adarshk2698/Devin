import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '$0.00';
    }
    return '$' + value.toFixed(2);
  }
}
