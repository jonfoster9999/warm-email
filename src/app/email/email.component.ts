import { ToastModule } from 'ng2-toastr/ng2-toastr';
import * as constants from './../http.constants';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TemplatesService } from '../services/templates.service';
import { Http } from '@angular/http';
import { Template } from '../models/template.model';
import { NgForm, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../models/property.model';
import { UsersService } from '../services/users.service';
import { Response } from '@angular/http/src/static_response';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  currentUser;
  myForm: FormGroup;
  template;
  emailHtml;
  contact_name;
  emailStore: any = {
    emails: []
  }

  i;
  closeImage = constants.FRONT_END_URL + "/assets/close.ico"

  constructor(private templatesService: TemplatesService, private http: Http,
              private route: ActivatedRoute, private usersService: UsersService,
              public toastr: ToastsManager, vcr: ViewContainerRef) { 
              }

  shouldInjectBeInvalid(i) {
    return !this.myForm.get('emails').get(String(i)).valid;
  }

  ngOnInit() {
    this.currentUser = this.usersService.currentUser;
    this.route.params 
      .map(data => data['id'])
      .switchMap(id => {
        return this.http.get(constants.API_URL + "/users/" + this.currentUser["id"] + "/templates/" + id) 
      })
        .subscribe((data) => {
          var obj = JSON.parse(data["_body"]);
          var template = this.templatesService.buildTemplate(obj)
          this.template = template;
          this.emailHtml = this.templatesService.preserveFormat(this.template["body"]);
          this.onAddEmail()
      })

    this.myForm = new FormGroup({
        'emails': new FormArray([])
     })     
  }

  onAddEmail() { 
    var obj = {};
    for (var i = 0, n = this.template.properties.length; i < n; i++) {
        obj[this.template.properties[i]["name"]] = new FormControl('', Validators.required);
    }
    (<FormArray>this.myForm.get('emails')).push(new FormGroup(obj));
  }

  formData () { 
    return <FormArray>this.myForm.get('emails'); 
  }

  sendEmails() {
    const overlay = document.getElementsByClassName('waiting-overlay')[0] as HTMLElement;
    this.templatesService.numberOfEmails.next(this.emailStore.emails.length)
    overlay.style.display = 'block';
    
    this.http.post(constants.API_URL + '/send_emails', this.emailStore)
      .map(data => data.json())
      .subscribe((data: Response) => {
        overlay.style.display = 'none';
        const sortedStoreIndices = this.emailStore.emails.map(email => email.emailIndex).sort((a, b) => b - a);
        sortedStoreIndices.forEach(index => {
          if (data['successes'].indexOf(index) > -1) {
            this.onDeleteEmail(index);
          }
        })

        if (data['errors'].length == 0) {
          this.toastr.success(`${data['successes'].length} of ${data['total_attempts']} messages sent!`)
          const toast = document.getElementsByClassName('toast-message')[0] as HTMLElement;
          toast.style.backgroundColor = 'lightgreen';
          toast.style.color = 'darkgreen';
        } else {
          this.toastr.warning(`${data['successes'].length} of ${data['total_attempts']} messages sent!`)
          const toast = document.getElementsByClassName('toast-message')[0] as HTMLElement;
          toast.style.backgroundColor = 'pink';
          toast.style.color = 'red';
        }
      })
  }

  onAddToQueue(i) {
    var id = "email-" + i
    var el = document.getElementById(id);
    var text = el.innerText;
    var email = text.match(/app-email(.*?)app-email/)[0].replace(/app-email/g, '').trim();
    var subject = text.match(/app-subject(.*?)app-subject/)[0].replace(/app-subject/g, '').trim();
    var body = text.split("app-body").pop();


    this.emailStore.emails.push({
      emailIndex: i,
      email: email, 
      subject: subject,
      body: body
    })
  }

  removeFromQueue(i) {
    this.emailStore.emails = this.emailStore.emails.filter(email => {
      return email.emailIndex !== i;
    })
  }

  emailIsInQueue(i) {
    return this.emailStore.emails.filter(email => {
      return email.emailIndex == i
    }).length > 0;
  }

  onInjectValues(i) { 
    var id = "email-" + i
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
    this.removeFromQueue(index);
    const control = (<FormArray>this.myForm.get('emails'))
    control.removeAt(index);
    this.emailStore.emails.forEach(email => {
      if (email.emailIndex >= index) {
        email.emailIndex -= 1;
      }
    })
  }

  onResetFields(index) {
    this.myForm.get("emails").get(index + "").reset();
    var id = "email-" + index
    var el = document.getElementById(id);
    el.innerHTML = this.templatesService.preserveFormat(this.template["body"]);
    this.removeFromQueue(index);
  }
}

