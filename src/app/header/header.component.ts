import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn = false
  currentUser: User
  constructor(private usersService: UsersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    //due to the guard, if we are in this componenet we are definitely logged in.
  	this.usersService.userLoggedInState
  		.subscribe((user) => {
  			this.loggedIn = true;
  			this.currentUser = user;
  		})
  }

  onLogOut() {
    this.usersService.loggedIn = false;
    this.loggedIn = false;
    this.router.navigate(["/login"])
  }

}
