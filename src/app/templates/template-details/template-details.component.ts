import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../models/template.model';
import { Property } from '../../models/property.model';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service'
import * as constants from 'app/http.constants';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {

  template;
  body;
  currentUser;

  constructor(private templatesService: TemplatesService,
              private http: Http,
              private route: ActivatedRoute,
              private router: Router,
              private usersService: UsersService
  			  ) { }

  ngOnInit() {
    this.currentUser = this.usersService.currentUser;
  	this.route.params 
  		.subscribe((data) => {
  			this.http.get(constants.API_URL + "/users/" + this.currentUser['id'] + "/templates/" + data["id"])
  				.subscribe((data) => {
  					var obj = JSON.parse(data["_body"]);
  					var template = this.templatesService.buildTemplate(obj);
  					this.template = template;
            this.body = this.templatesService.preserveFormat(this.template.body)
  				})
  		})
  }

  deleteTemplate() {
    this.http.delete(constants.API_URL + "/users/" + this.currentUser['id'] + "/templates/" + this.template.id)
      .subscribe(
          (data) => {
            this.templatesService.updateTemplateEmitter.emit();
            this.router.navigate(['templates'])
          }
        )
  }

}
