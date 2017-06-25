import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TemplatesService } from './services/templates.service';
import { Template } from './models/template.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  templates = []

  selected = "1"
  constructor(private http: Http, private templatesService: TemplatesService) {

  }


  ngOnInit() {
  	this.http.get("http://localhost:3000/templates")
  		.subscribe((data) => {
        var templates = JSON.parse(data["_body"]);
        this.templates = templates;
  			// this.templatesService.importTemplates(JSON.parse(data["_body"]));
  			// console.log(JSON.parse(data["_body"]))
  			// this.templates = this.templatesService.templates;

  		})
  }
}
