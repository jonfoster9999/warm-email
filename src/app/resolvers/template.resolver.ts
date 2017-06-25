import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Http } from '@angular/http'
import { Template } from '../models/template.model';
import { TemplatesService } from '../services/templates.service';

@Injectable()
export class TemplateResolve implements Resolve<any> {
	constructor(private http: Http, private templatesService: TemplatesService ) {}

	resolve(route:ActivatedRouteSnapshot) {
		
        this.http.get("http://localhost:3000/templates/" + route.paramMap.get('id')) 
      		.subscribe((data) => {
 
        		var obj = JSON.parse(data["_body"]);
        		console.log(obj);
        		var template = this.templatesService.buildTemplate(obj)
        		var temp = template;
        		return temp;
			})
		;
		
    }
}
