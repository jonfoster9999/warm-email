import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../../services/templates.service';

@Component({
  selector: 'app-template-details',
  templateUrl: './template-details.component.html',
  styleUrls: ['./template-details.component.css']
})
export class TemplateDetailsComponent implements OnInit {

  constructor(private templatesService: TemplatesService) { }

  ngOnInit() {
  	this.templatesService.emitTemplateIndex.subscribe(
  		(data) => {
  			console.log(data, "in service")
  		}
  		)
  }

}
