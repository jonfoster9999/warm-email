import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { TemplatesService } from './services/templates.service';
import { Template } from './models/template.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  numberOfEmails;

  constructor(private http: Http, private templatesService: TemplatesService, public toastr: ToastsManager, vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.templatesService.numberOfEmails
      .subscribe(numberOfEmails => {
        this.numberOfEmails = numberOfEmails;
      })
  }
}
