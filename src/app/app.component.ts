import { Component, OnInit } from '@angular/core';
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

  constructor(private http: Http, private templatesService: TemplatesService) {

  }


  ngOnInit() {

  }
}
