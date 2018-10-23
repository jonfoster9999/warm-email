import { Injectable, Renderer2 } from "@angular/core";
import { Http } from "@angular/http";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import * as constants from "app/http.constants";

@Injectable()
export class UsersService {

	loggedIn: boolean = false;
	// currentUser: User = null;
	userLoggedInState = new Subject<any>();
	
	sendDuplicate = new Subject<any>();

	constructor(private http: Http, private router: Router) {

	}

	keyUpHandler() {
		this.sendDuplicate.next(false);
		document.getElementById('email-register').classList.remove("ng-invalid")
		document.getElementById('email-register').classList.add("ng-valid")
		document.getElementById('email-register').removeEventListener("onkeyup", this.keyUpHandler)

	}

	currentUser() {
		return JSON.parse(localStorage.getItem('currentUser')) || null;
	}

	sendRegistration(formObject) {
		this.http.post(constants.API_URL + "/register", formObject) 
			.subscribe((data) => {
				if (data["_body"] !== "failure") {
				//TODO: check if registration was successful
				this.loggedIn = true;
				data = JSON.parse(data["_body"]);
				localStorage.setItem('currentUser', JSON.stringify(new User(data["username"], data["email"], data["id"])))
				// this.currentUser = new User(data["username"], data["email"], data["id"])
				this.userLoggedInState.next(this.currentUser());
				this.router.navigate(["/templates"])
				} else {
					var el = document.getElementById('email-register')
					el.classList.remove('ng-valid');
					el.classList.add('ng-invalid');
					el.classList.add('ng-touched');
					this.sendDuplicate.next(true);
					el.onkeyup = this.keyUpHandler.bind(this);
				}
			})
	}

	sendLogin(formObject) {
		this.http.post(constants.API_URL + "/login", formObject)
			.subscribe((data) => {

				//TODO: check if login was successful
				if (data["_body"] !== "failure") {
					this.loggedIn = true;
					data = JSON.parse(data["_body"]);
					localStorage.setItem('currentUser', JSON.stringify(new User(data["username"], data["email"], data["id"])))
					// this.currentUser = new User(data["username"], data["email"], data["id"])
					this.userLoggedInState.next(this.currentUser());
					this.router.navigate(["/templates"])
				} else {
					var el = document.getElementById('login-error');
					el.style.display = "block";
				}
			})
	}
}