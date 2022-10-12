import { Injectable } from '@angular/core';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStart } from '@fortawesome/free-regular-svg-icons';

@Injectable({
  providedIn: 'root',
})
  
export class StarsService {
  faStar = faStar;
  faStarHalf = faStarHalfStroke;
  faEmptyStar = emptyStart;
  constructor() {}
  star(value: number) {
    let arr = Array(10).fill(0);
    return arr.map((_, i) => {
      if (value - i >= 1) {
        return this.faStar;
      } else if (value - i === 0.5) {
        return this.faStarHalf;
      } else {
        return this.faEmptyStar;
      }
    });
  }
}
