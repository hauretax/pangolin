import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    const isAuthenticated = this.cookieService.check('usr-Id');

    if (state.url === '/login' || state.url === '/registration') {
      if (isAuthenticated) {
        return this.router.parseUrl('/');
      }
    } else {
      if (!isAuthenticated) {
        return this.router.parseUrl('/login');
      }
    }

    return true;
  }
}
