import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../models/template.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from '../../models/property.model'
import { Headers, RequestOptions, Http } from '@angular/http';
import { UsersService } from '../../services/users.service';
import 'rxjs/add/operator/toPromise';
declare var $:any;

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.css']
})
export class TemplateEditComponent implements OnInit, AfterViewInit {
  currentUser;
  template = {name: "loading", id: 1, body: "loading"}; 
  defaultVariables = []
  constructor(private http: Http, 
              private route: ActivatedRoute, 
              private router: Router, 
              private templatesService: TemplatesService,
              private usersService: UsersService) {}

  ngOnInit() {
    this.currentUser = this.usersService.currentUser;
  	this.templatesService.newFlagEmitter.emit(true);
    this.route.params
      .subscribe((data) => {
        this.http.get("http://localhost:3000/users/" + this.currentUser['id'] + "/templates/" + data["id"])
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
    var ctl = <HTMLInputElement> document.getElementById('body_text_area');
    var startPos = ctl.selectionStart;
    var firstString = this.template.body.substring(0, startPos),
        secondString = "**" + element.name + "**",
        thirdString = this.template.body.substring(startPos);

    this.template.body = firstString + secondString + thirdString;
    ctl.focus();
    ctl.select();
  }

  newVariable() {
    var newVar = window.prompt("Add a new variable:")
    newVar = newVar.split(" ").join("_")
    this.defaultVariables.push(new Property(newVar));
    setTimeout(() => {
      this.addHandlers();
    }, 500)
  }

  onSubmit(form) {
    var obj = form["form"]["_value"]
    obj["properties"] = this.defaultVariables;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.patch("http://localhost:3000/users/" + this.currentUser['id'] + "/templates/" + this.template.id, JSON.stringify(obj), options)
      .subscribe((data) => {

        this.templatesService.updateTemplateEmitter.emit();
        this.router.navigate(['/templates'])
      })
 	}

  removeItem(event, index) {
    event.stopPropagation();
    this.defaultVariables.splice(index, 1);
  }

  //fix this one the server side????



  ngAfterViewInit() {
    setTimeout(this.addHandlers, 100)
    this.addHandlers()
  }

  addHandlers() {

    $.each($('.variable-list'), function(index, el) {

        el.addEventListener("mouseenter", function(){
          el.getElementsByTagName('span')[0].style.display = "inline";
        }, false)
        el.addEventListener("mouseleave", function(){
          el.getElementsByTagName('span')[0].style.display = "none";
        }, false)
    })
  }
}
