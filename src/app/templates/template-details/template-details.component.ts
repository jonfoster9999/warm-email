import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../models/template.model';
import { Property } from '../../models/property.model';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {

  template;

  constructor(private templatesService: TemplatesService,
              private http: Http,
              private route: ActivatedRoute
  			  ) { }

  ngOnInit() {
  	// this.templatesService.emitTemplateIndex.subscribe(
  	// 	(data) => {
  	// 		this.http.get("http://localhost:3000/templates/" + data)
  	// 			.subscribe((data) => {
  	// 				var obj = JSON.parse(data["_body"]);
  	// 				var template = this.templatesService.buildTemplate(obj);
  	// 				this.template = template;
  	// 			})
  	// 		}
  	// 	)
  	this.route.params 
  		.subscribe((data) => {
  			this.http.get("http://localhost:3000/templates/" + data["id"])
  				.subscribe((data) => {
  					var obj = JSON.parse(data["_body"]);
  					var template = this.templatesService.buildTemplate(obj);
  					this.template = template;
  				})
  		})
  }

}
