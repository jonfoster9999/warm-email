import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";

@Injectable()
export class UsersService {

	loggedIn: boolean = false;
	currentUser: User = null;
	userLoggedInState = new Subject<any>();

	constructor(private http: Http, private router: Router) {

	}

	sendRegistration(formObject) {
		this.http.post("http://localhost:3000/register", formObject) 
			.subscribe((data) => {
				//TODO: check if registration was successful
				this.loggedIn = true;
				data = JSON.parse(data["_body"]);
				this.currentUser = new User(data["username"], data["email"], data["id"])
				this.userLoggedInState.next(this.currentUser);
				this.router.navigate(["/templates"])
			})
	}

	sendLogin(formObject) {
		this.http.post("http://localhost:3000/login", formObject)
			.subscribe((data) => {
				//TODO: check if login was successful
				this.loggedIn = true;
				data = JSON.parse(data["_body"]);
				this.currentUser = new User(data["username"], data["email"], data["id"])
				this.userLoggedInState.next(this.currentUser);
				this.router.navigate(["/templates"])
			})
	}
}