import { Component, OnInit, HostBinding } from '@angular/core';
import { Http } from '@angular/http';
import { TemplatesService } from '../services/templates.service';
import { Template } from '../models/template.model';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  title = 'app';



  constructor(private http: Http, private templatesService: TemplatesService) {
  	
  }


  ngOnInit() {
  }



}