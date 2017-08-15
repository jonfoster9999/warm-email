import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templatefilter'
})
export class TemplatefilterPipe implements PipeTransform {
  transform(controls: any, body?: any): any {
    var bodyArray = body.match(/\S+/g).filter((element) => {
    	return element.includes("**");
    }).map( (el) => {
      var el = el.replace(/[**]/gi, "")
    	return el.match(/[A-Za-z0-9_]+/gi)[0]
    })
    return controls.filter((control) => {
    	return bodyArray.includes(control["name"])
    })
  }
}
