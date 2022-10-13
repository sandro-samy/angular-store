import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {}
  get getLoaderStatus() {
    return this.loader.asObservable();
  }
  set setLoaderStatus(value: boolean) {
    this.loader.next(value);
  }
}
