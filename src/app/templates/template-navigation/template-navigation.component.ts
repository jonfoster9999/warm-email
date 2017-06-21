import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../models/template.model';

@Component({
  selector: 'app-template-navigation',
  templateUrl: './template-navigation.component.html',
  styleUrls: ['./template-navigation.component.css']
})
export class TemplateNavigationComponent implements OnInit {
  title = 'app';



  templates = []

  selected = "1"
  constructor(private http: Http, private templatesService: TemplatesService) {

  }


  ngOnInit() {
  	this.http.get("http://localhost:3000/templates")
  		.subscribe((data) => {
  			console.log(JSON.parse(data["_body"]))
        var templates = JSON.parse(data["_body"]);
        this.templates = templates;
  			// this.templatesService.importTemplates(JSON.parse(data["_body"]));
  			// console.log(JSON.parse(data["_body"]))
  			// this.templates = this.templatesService.templates;

  		})
  }

  chooseTemplate(index) {
    this.templatesService.emitTemplateIndex.emit(index);
  }


}
