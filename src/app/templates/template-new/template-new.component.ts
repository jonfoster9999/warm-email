
import { Component, OnInit, OnDestroy, HostBinding, AfterViewInit, ViewChild } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Property } from '../../models/property.model'
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import 'rxjs/add/operator/toPromise';
declare var $:any;

@Component({
  selector: 'app-template-new',
  templateUrl: './template-new.component.html',
  styleUrls: ['./template-new.component.css']
})
export class TemplateNewComponent implements OnInit, OnDestroy, AfterViewInit {

  currentUser;

  constructor(private templatesService: TemplatesService, private http: Http, private router: Router, private usersService: UsersService) { }
  defaultVariables = [new Property("email"), 
                      new Property("subject"), 
                      new Property("contact_name"), 
                      new Property("contact_company")
                      ]

    body = `To: **email** 
Subject: **subject**
_________________________
Message Below
--------------------------------`;

  @ViewChild('f') myForm;

  ngOnInit() {
    this.currentUser = this.usersService.currentUser();
  	this.templatesService.newFlagEmitter.emit(true);
    
  }

  ngOnDestroy() {
  	this.templatesService.newFlagEmitter.emit(false);
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

  addVariable(element) {
    var ctl = <HTMLInputElement> document.getElementById('body_text_area');
    var startPos = ctl.selectionStart;
    var firstString = this.body.substring(0, startPos),
        secondString = "**" + element.name + "**",
        thirdString = this.body.substring(startPos);
    this.body = firstString + secondString + thirdString;
    ctl.focus();
    setTimeout( () => {
      ctl.setSelectionRange(startPos + secondString.length, startPos + secondString.length);
    }, 0) 
  }

  // setCaretPosition(elemId, caretPos) {
  //   var elem = document.getElementById(elemId);

  //   if(elem != null) {
  //       if(elem.createTextRange) {
  //           var range = elem.createTextRange();
  //           range.move('character', caretPos);
  //           range.select();
  //       }
  //       else {
  //           if(elem.selectionStart) {
  //               elem.focus();
  //               elem.setSelectionRange(caretPos, caretPos);
  //           }
  //           else
  //               elem.focus();
  //       }
  //    }
  // }    

  newVariable() {
    var newVar = window.prompt("Add a new variable:")
    newVar = newVar.split(" ").join("_")
    this.defaultVariables.push(new Property(newVar));
    setTimeout(() => {
      this.addHandlers();
    }, 500)
    
  }

  removeItem(event, index) {
    event.stopPropagation();
    this.defaultVariables.splice(index, 1);
  }

  onSubmit(form) {
    var obj = form["form"]["_value"]
    obj["properties"] = this.defaultVariables;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://warm-email-backend.herokuapp.com/users/" + this.currentUser['id'] + "/templates", JSON.stringify(obj), options)
      .subscribe((data) => {
        this.templatesService.updateTemplateEmitter.emit();
        this.router.navigate(['/templates'])
      })        
  }

  ngAfterViewInit() {
    this.addHandlers()
  }

}
