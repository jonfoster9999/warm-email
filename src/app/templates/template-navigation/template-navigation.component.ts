import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { TemplatesService } from '../../services/templates.service';
import { Template } from '../../models/template.model';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model'
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-template-navigation',
  templateUrl: './template-navigation.component.html',
  styleUrls: ['./template-navigation.component.css']
})
export class TemplateNavigationComponent implements OnInit {
  title = 'app';
  currentUser: any;

  newFlag = this.templatesService.newFlag;

  templates = []

  selected = "1"
  
  constructor(private http: Http, private templatesService: TemplatesService,
  			  private router: Router, private route: ActivatedRoute,
          private usersService: UsersService) {}

  ngOnInit() {
    this.currentUser = this.usersService.currentUser();
  	this.http.get("https://warm-email-backend.herokuapp.com/users/" + this.currentUser['id'] + "/templates")
  		.subscribe((data) => {
        	var templates = JSON.parse(data["_body"]);
        	this.templates = templates;
  		})
  	this.templatesService.newFlagEmitter
  		.subscribe((data) => {
  			this.newFlag = data;
  		})
    this.templatesService.updateTemplateEmitter
      .subscribe((data) => {
        this.http.get("https://warm-email-backend.herokuapp.com/users/" + this.currentUser['id'] + "/templates")
          .subscribe((data) => {
              var templates = JSON.parse(data["_body"]);
              this.templates = templates;
          })
      })
  }

  chooseTemplate(index) {
    // this.templatesService.emitTemplateIndex.emit(index);
    this.router.navigate(['/templates', index])
  }

  onNewTemplate() {
  	 this.router.navigate(['/templates', "new"])
  }

  onBackToTemplates() {
  	this.router.navigate(['/templates'])
  }
}
