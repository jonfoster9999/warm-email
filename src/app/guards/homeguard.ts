import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs/observable'

@Injectable()
export class CanActivateHome implements CanActivate {

	constructor(private usersService: UsersService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
		if (this.usersService.loggedIn) {
			this.router.navigate(['/templates'])
		} else if (!this.usersService.loggedIn) {
			this.router.navigate(['/login'])
		} else {
			return true;
		}
	}
}