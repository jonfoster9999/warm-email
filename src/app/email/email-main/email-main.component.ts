import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Http } from '@angular/http';
import { Template } from '../../models/template.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-email-main',
  templateUrl: './email-main.component.html',
  styleUrls: ['./email-main.component.css']
})
export class EmailMainComponent implements OnInit {
  template;
  bodyHtml;

  constructor(private templatesService: TemplatesService, private http: Http,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.template = new Template(null, null, null);
    this.route.params
      .subscribe((data) => {
        this.http.get("http://localhost:3000/templates/" + data["id"]) 
      .subscribe((data) => {
        var obj = JSON.parse(data["_body"]);
        var template = this.templatesService.buildTemplate(obj)
        this.template = template;
        this.bodyHtml = this.template["body"]
      })

      })
  }

  onSubmit(form: NgForm) {
  	var formData = form["form"]["_value"]
  	console.log(this.template.body, "first argument")
  	console.log(this.template.properties, "second argument")
  	console.log(formData)
  	var html = this.templatesService.convertTemplate(this.template.body, this.template.properties, formData);
  	this.bodyHtml = html;
  }

}
