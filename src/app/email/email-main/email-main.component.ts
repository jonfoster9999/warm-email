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

  }

  onSubmit(form: NgForm) {
  	var formData = form["form"]["_value"]
  	console.log(this.template.body, "first argument")
  	console.log(this.template.properties, "second argument")
  	console.log(formData, "third argument")
  	var html = this.templatesService.convertTemplate(this.template.body, this.template.properties, formData);
  	this.bodyHtml = html;
  }

}
