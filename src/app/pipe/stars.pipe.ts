import { Pipe, PipeTransform } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStart } from '@fortawesome/free-regular-svg-icons';
@Pipe({
  name: 'stars',
})
export class StarsPipe implements PipeTransform {
  faStar = faStar;
  faStarHalf = faStarHalf;
  faEmptyStar = emptyStart;
  transform(value: string, ...args: unknown[]): unknown {
    let arr = Array(10).fill(0);
    let valueAsNumber = parseInt(value);
    return arr.map((_, i) => {
      if (i + 1 <= valueAsNumber) {
        return;
      } else if (valueAsNumber - (i + 1) === 0.5) {
        return this.faStarHalf;
      } else {
        return this.faEmptyStar;
      }
    });
  }
}
