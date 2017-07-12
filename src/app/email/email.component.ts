import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplatesService } from '../services/templates.service';
import { Http } from '@angular/http';
import { Template } from '../models/template.model';
import { NgForm, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../models/property.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  currentUser;
  myForm: FormGroup;
  counter = 0;
  template;
  bodyHtml;
  contact_name;
  i;
  closeImage = "http://localhost:4200/assets/close.ico"

  constructor(private templatesService: TemplatesService, private http: Http,
              private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.template = new Template(null, null, null);
    this.currentUser = this.usersService.currentUser;
    this.route.params
      .subscribe((data) => {
        this.http.get("http://warm-email-backend.herokuapp.com/users/" + this.currentUser["id"] + "/templates/" + data["id"]) 
      .subscribe((data) => {
        var obj = JSON.parse(data["_body"]);
        var template = this.templatesService.buildTemplate(obj)
        this.template = template;
        this.bodyHtml = this.templatesService.preserveFormat(this.template["body"]);

        this.onAddEmail()
      })
      })
    this.myForm = new FormGroup({
        'emails': new FormArray([])
     })
  }

  onAddEmail() { 
    var obj = {};
    for (var i = 0, n = this.template.properties.length; i < n; i++) {
        obj[this.template.properties[i]["name"]] = new FormControl();
    }
    (<FormArray>this.myForm.get('emails')).push(new FormGroup(obj))
    this.counter++
  }

  formData () { 
    return <FormArray>this.myForm.get('emails'); 
  }

  onSubmit(form: NgForm) {
    console.log(this.myForm);
  }

  onInjectValues(i) { 
    var id = "body-" + i
    var el = document.getElementById(id);
    var firstArgument = el.innerText;
    var thirdArgument = this.myForm.get("emails").get(i.toString())["_value"]
    var secondArgument = [];
    for(var key in thirdArgument ) {
      secondArgument.push(new Property(key.toString()));
    }
    var html = this.templatesService.convertTemplate(this.template.body, secondArgument, thirdArgument);
    var html = html.replace(/null/g, "**please enter a value**")
    el.innerHTML = html;
  }

  onDeleteEmail(index) {
    const control = (<FormArray>this.myForm.get('emails'))
    control.removeAt(index);
  }

  onResetFields(index) {
    this.myForm.get("emails").get(index + "").reset();
    var id = "body-" + index
    var el = document.getElementById(id);
    el.innerHTML = this.templatesService.preserveFormat(this.template["body"]);
  }
}

