import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../models/template.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from '../../models/property.model'
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css']
})
export class TemplateEditComponent implements OnInit {
  template = {name: "loading", id: 1, body: "loading"}; 
  defaultVariables = []
  // defaultVariables = []
  constructor(private http: Http, private route: ActivatedRoute, private router: Router, private templatesService: TemplatesService) {

   }
  ngOnInit() {
  	this.templatesService.newFlagEmitter.emit(true);
    this.route.params
      .subscribe((data) => {
        this.http.get("http://localhost:3000/templates/" + data["id"])
          .subscribe((data) => {
            var template = JSON.parse(data["_body"])
            this.template = template
            this.defaultVariables = template.properties
          })
      })
  }

  ngOnDestroy() {
  	this.templatesService.newFlagEmitter.emit(false);
  }

  addVariable(element) {
    this.template.body += "**" + element.name + "**"
  }

  newVariable() {
    var newVar = window.prompt("Add a new variable:")
    newVar = newVar.split(" ").join("_")
    this.defaultVariables.push(new Property(newVar));
  }

  onSubmit(form) {
    var obj = form["form"]["_value"]
    obj["properties"] = this.defaultVariables;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.patch("http://localhost:3000/templates/" + this.template.id, JSON.stringify(obj), options)
      .subscribe((data) => {

        this.templatesService.updateTemplateEmitter.emit();
        this.router.navigate(['/templates'])
      })
 	}

}
