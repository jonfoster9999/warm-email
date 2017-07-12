import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class CanActivateViaUserService implements CanActivate {

	constructor(private usersService: UsersService, private router: Router) {}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean { 
		if (this.usersService.loggedIn) {
			return true;
		} else {
			console.log("Refused")
			this.router.navigate(['/login'])
		}
	}
}