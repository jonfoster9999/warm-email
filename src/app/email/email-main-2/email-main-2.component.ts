import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Http } from '@angular/http';
import { Template } from '../../models/template.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-email-main-2',
  templateUrl: './email-main-2.component.html',
  styleUrls: ['./email-main-2.component.css']
})
export class EmailMain2Component implements OnInit {
  template;
  bodyHtml;
  @Input('myFormGroup') myFormGroup;
  @Input('index') index;
  @Input('f') f;
  // @ViewChild('f') formReference;


  @Output('emitProperties') emitProperties = new EventEmitter<{properties: any[], index: any}>();

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

  	console.log(this.template.properties);
  	var index = this.index.toString();
  	var templateProperties: any[] = this.template.properties;
  	//we need object to the main form object and also this particular form group
  	this.emitProperties.emit({properties: templateProperties, index: index});
  	// var html = this.templatesService.convertTemplate(this.template.body, this.template.properties, formData);
  	// this.bodyHtml = html;
  }

}
