import { Injectable } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStart } from '@fortawesome/free-regular-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class StarsService {
  faStar = faStar;
  faStarHalf = faStarHalf;
  faEmptyStar = emptyStart;
  constructor() {}
  star(value: number): string[] {
    let arr = Array(10).fill(0);
    // let valueAsNumber = parseInt(value);
    return arr.map((_, i): string => {
      if (value - (i + 1) >= 1) {
        return 'faStar';
      } else if (value - (i + 1) === 0.5) {
        return 'faStarHalf';
      } else {
        return 'faEmptyStar';
      }
    });
  }
}
