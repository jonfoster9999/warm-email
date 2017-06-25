import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplatesService } from '../services/templates.service';
import { Http } from '@angular/http';
import { Template } from '../models/template.model';
import { NgForm, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emails = [1];

  addEmail() {
    this.emails.push(1);
  };
  counter = 0;
  template;
  bodyHtml;

  constructor(private templatesService: TemplatesService, private http: Http,
              private route: ActivatedRoute) { }

  contact_name = "peter"

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
        console.log(this.template.pro)
        this.onAddHobby()
      })

      })
    var obj = {};


    this.myForm = new FormGroup({
        'hobbies': new FormArray([])
     })

  }

  onAddHobby() {
    console.log("hello")
    var obj = {};

    for (var i = 0, n = this.template.properties.length; i < n; i++) {
        obj[this.template.properties[i]["name"]] = new FormControl();
    }

    (<FormArray>this.myForm.get('hobbies')).push(new FormGroup(obj))
    this.counter++
  }

  onSubmit(form: NgForm) {
  	// var formData = form["form"]["_value"]

  	// var html = this.templatesService.convertTemplate(this.template.body, this.template.properties, formData);
  	// this.bodyHtml = html;
    console.log(this.myForm);
  }


  myForm: FormGroup;

  otherWay(i) {
    var data = this.myForm.get("hobbies").get(i.toString())
    var id = "body-" + i
    var el = document.getElementById(id);
  }
}

//split sentence then loop through the words  
//if word starts with jf-  we need to replace it 
//
