import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Http } from '@angular/http'
import { Template } from '../models/template.model';
import { TemplatesService } from '../services/templates.service';
import { UsersService } from '../services/users.service'

@Injectable()
export class TemplateResolve implements Resolve<any> {
	constructor(private http: Http, private templatesService: TemplatesService, private usersService: UsersService ) {}
	resolve(route:ActivatedRouteSnapshot) {
        var user_id = this.usersService.currentUser()["id"];
        this.http.get("https://warm-email-backend.herokuapp.com/users/" + user_id + "/templates/" + route.paramMap.get('id')) 
      		.subscribe((data) => {
        		var obj = JSON.parse(data["_body"]);
        		var template = this.templatesService.buildTemplate(obj)
        		var temp = template;
        		return temp;
			})
		;
    }
}
