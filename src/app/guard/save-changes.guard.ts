import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  leave: () => Promise<boolean> | Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SaveChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean> | UrlTree | boolean {
    return component.leave ? component.leave() : true;
  }
}
