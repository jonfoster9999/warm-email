import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { UsersService } from '../services/users.service';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService) { }
  duplicate = false

  ngOnInit() {
	$(function() {
	    $('#login-form-link').click(function(e) {
	    	$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
	});

  this.usersService.sendDuplicate 
    .subscribe( (data) => {
        this.duplicate = data;
    })
  }

  registrationForm = new FormGroup({
  	'email': new FormControl(null, Validators.required),
  	'password1': new FormControl(null, Validators.required),
  	'password2': new FormControl(null, Validators.required)
  }, this.validateSecondPassword)

  loginForm = new FormGroup({
  	'email': new FormControl(null, Validators.required),
  	'password': new FormControl(null, Validators.required)
  })

  onRegister() {
  	this.usersService.sendRegistration(this.registrationForm["_value"])
  }

  onLogin() {
  	this.usersService.sendLogin(this.loginForm["value"])
  }

  validateSecondPassword(AC: AbstractControl): {[s: string]: boolean} {
    let password = AC.get("password1").value;
    let confirmPassword = AC.get("password2").value;
    if (password !== confirmPassword) {
      AC.get('password2').setErrors({"not-valid": true})
    }
    return null;
  }
}
