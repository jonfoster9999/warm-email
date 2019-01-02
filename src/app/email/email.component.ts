import { ToastModule } from 'ng2-toastr/ng2-toastr';
import * as constants from './../http.constants';
import { Component, OnInit, ViewChild, ViewContainerRef, HostListener, ElementRef, Renderer2 } from '@angular/core';
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
import { PapaParseService } from 'ngx-papaparse';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  eventTriggered = false;
  @ViewChild('hiddenButton') hiddenButton: ElementRef;
  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    var y = window.scrollY;
    if (y >= 103) {
      this.eventTriggered = true;
      this.renderer.removeClass(this.hiddenButton.nativeElement, 'bottom-right-button-hidden')
      this.renderer.addClass(this.hiddenButton.nativeElement, 'bottom-right-button-show')
    } else {
      if (this.eventTriggered) {
        this.renderer.removeClass(this.hiddenButton.nativeElement, 'bottom-right-button-show')
        this.renderer.addClass(this.hiddenButton.nativeElement, 'bottom-right-button-hidden')
      }
    }
  } 
  currentUser;
  reader;
  myForm: FormGroup;
  template;
  emailHtml;
  localEmails = []
  contact_name;
  emailStore: any = {
    emails: []
  }

  i;
  closeImage = constants.FRONT_END_URL + "/assets/close.ico"

  constructor(private templatesService: TemplatesService, private http: Http,
              private route: ActivatedRoute, private usersService: UsersService,
              public toastr: ToastsManager, vcr: ViewContainerRef,
              private renderer: Renderer2,
              private papa: PapaParseService) { 
            }

  shouldInjectBeInvalid(i) {
    return !this.myForm.get('emails').get(String(i)).valid;
  }

  ngOnInit() {
    this.currentUser = this.usersService.currentUser();
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

  checkSentAlready(i) {
    let email = this.myForm.get('emails').get(String(i)).value['email']
    if (email) {
      email = email.trim();
      this.http.get(constants.API_URL + '/users/' + this.currentUser.id + '/sent_emails')
        .map(res => res.json())
        .subscribe(data => {
          const results = data.filter(x => {
            return x.email == email
          })
          const el = document.getElementById('button-' + i);
          if (results.length > 0) {
            el.style.backgroundColor = 'rgb(244, 102, 64)';
            el.style.color = 'white';
            // el.style.backgroundColor = 'gold';
          } else {
            el.style.backgroundColor = 'lightgoldenrodyellow';
            el.style.color = 'black'

          }
          el.innerText = 'Email Count History: ' + results.length;
  
        })
    }
  }

  resetEmailCount(i) {
    this.checkSentAlready(i);
    this.checkDuplicateOnPage(i);
  }

  checkDuplicateOnPage(i) {
    const currentEmail = this.myForm.get('emails').get(String(i)).get('email').value;

    const emails = (<FormArray>this.myForm.get('emails')).controls.filter(control => {
      return control.get('email').value == currentEmail;
    })
    const el = document.getElementById('duplicate-' + i);
    if (emails.length > 1 && (currentEmail.trim() != '')) {
      el.innerHTML = 'duplicate email on page';
    } else {
      el.innerHTML = '';
    };
  }

  sendEmails() {
    const overlay = document.getElementsByClassName('waiting-overlay')[0] as HTMLElement;
    this.templatesService.numberOfEmails.next(this.emailStore.emails.length)
    overlay.style.display = 'block';
    console.log('this is the email store', this.emailStore);
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

        this.http.post(constants.API_URL + '/users/' + this.currentUser["id"] + '/sent_emails', { email: data['sent_email_addresses']})
          .subscribe(data => {
            console.log('sent', data);
        })


        if (data['errors'].length == 0) {
          this.toastr.success(`${data['successes'].length} of ${data['total_attempts']} messages sent!`);
        } else {
          this.toastr.error(`${data['successes'].length} of ${data['total_attempts']} messages sent!`);
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
    var e = document.getElementById("select-" + i);
    var email_type = e['options'][e['selectedIndex']].value;


    this.emailStore.emails.push({
      emailIndex: i,
      email: email, 
      subject: subject,
      body: body,
      email_type: email_type
    })

  
  }

  localAddToQueue(html, i) {
    // var div = document.createElement('div');
    // div.innerHTML = html;

    // var text = div.textContent;
    // var email = text.match(/app-email(.*?)app-email/)[0].replace(/app-email/g, '').trim();
    // var subject = text.match(/app-subject(.*?)app-subject/)[0].replace(/app-subject/g, '').trim();
    // var body = text.split("app-body").pop();
  
    // var email_type = 'sent-via-csv'
    // console.log('body?', body)
    // this.emailStore.emails.push({
    //   emailIndex: i,
    //   email: email, 
    //   subject: subject,
    //   body: body,
    //   email_type: email_type
    // })

    // first put it up there, then grab it?

    var id = "hidden-div"
    var el = document.getElementById(id);
    el.innerHTML = html;
    var el2 = document.getElementById(id);
    var text = el2.innerText;
    var email = text.match(/app-email(.*?)app-email/)[0].replace(/app-email/g, '').trim();
    var subject = text.match(/app-subject(.*?)app-subject/)[0].replace(/app-subject/g, '').trim();
    var body = text.split("app-body").pop();
    var e = document.getElementById("select-" + i);
    var email_type = 'sent-via-csv'


    this.emailStore.emails.push({
      emailIndex: i,
      email: email, 
      subject: subject,
      body: body,
      email_type: email_type
    })
  }

  addAllToQueue() {
    this.clearQueue();
    (<FormArray>this.myForm.get('emails')).controls.forEach((control, i) => {
      this.onAddToQueue(i);
    })
  }

  clearQueue() {
    this.emailStore.emails = [];
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
    console.log('inject html????', html)
    var html = html.replace(/null/g, "**please enter a value**")
    el.innerHTML = html;
  }

  localInject(obj) {
    var el = document.getElementById('hidden-div');
    var nullThings = 0
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var thirdArgument={}
    while (n--) {
      key = keys[n];
      if (obj[key] == "" || obj[key] == " " || obj[key] == undefined || obj[key] == null) {
        nullThings++;
      }
      thirdArgument[key.toLowerCase()] = obj[key];
    }
    if (nullThings < 1) {
      var secondArgument = [];
      for(var localkey in thirdArgument ) {
        secondArgument.push(new Property(localkey.toString()));
      }
      var html = this.templatesService.convertTemplate(this.template.body, secondArgument, thirdArgument);
      console.log('inject html????', html)
      var html = html.replace(/null/g, "**please enter a value**")
      this.localEmails.push(html);
      console.log('local emails....', this.localEmails);
    }
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
    const el2 = document.getElementById('button-' + index);
    el2.style.backgroundColor = 'lightgoldenrodyellow';
    el2.style.color = 'black';
    el2.innerHTML = 'Email Count History: 0'
  }

  uploadCSV() {
    document.getElementById('file-picker').click();
  }

  arraysEqual(_arr1, _arr2) {
    if (!Array.isArray(_arr1) || ! Array.isArray(_arr2) || _arr1.length !== _arr2.length) {
      return false;
    }
    var arr1 = _arr1.concat().sort();
    var arr2 = _arr2.concat().sort();
    for (var i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i])
          return false;
      }
    return true;
  }

  csvComplete(result) {
    let exitEarly = false;
    const headers = Object.keys(result['data'][0]).map(x => x.toLowerCase());
    const properties = this.template.properties.map(x => x.name);
    // there is not an entry for headers for every entry of properties
    console.log('headers', headers)
    console.log('properties', properties)
    properties.forEach(x => {
      if (headers.indexOf(x) < 0) {
        exitEarly = true; 
      }
    })
    if (exitEarly) {
      alert(`Mismatched headers and properties! CSV has [${headers.join(', ')}], template needs [${properties.join(', ')}]`)
    } else {
      result['data'].forEach(obj => {
        this.localInject(obj)
      })
      this.localEmails.forEach((text, i) => {
        this.localAddToQueue(text, i)
      })
      if(confirm("Send " + this.emailStore.emails.length + ' emails?')) {
        this.sendEmails()
      }
    }
  }

  readerOnload(e) {
    let csv: string = <any>this.reader.result;
    this.papa.parse(csv, {
      header: true,
      complete: this.csvComplete.bind(this)
    })  
  }

  changeListener(files) {
    if(files && files.length > 0) {
      let file : File = files.item(0); 
        let reader: FileReader = new FileReader();
        reader.readAsText(file);
        this.reader = reader;
        reader.onload = this.readerOnload.bind(this)
     }
  }
}

