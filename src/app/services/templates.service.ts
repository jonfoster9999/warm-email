import { Template } from "../models/template.model";
import { Property } from "../models/property.model";
import { EventEmitter } from "@angular/core";
import { Subject } from 'rxjs/Subject'

export class TemplatesService {

	newFlag = false;

	buildTemplate(obj) {
		var template = new Template(obj["name"], obj["body"])
		var properties = [];
		for (var prop in obj["properties"]) {
			properties.push(new Property(obj['properties'][prop]["name"]))
		}
		template.properties = properties 
		template["id"] = obj["id"]
		return template;
	}

	convertTemplate(string, props, formData) {
		var strings = string.split("\n")
		var end = strings.map((string) => {
			var stringArr = string.split(/\s+/)
			for (var i = 0; i < stringArr.length; i++) {
				if (stringArr[i].startsWith("**")) {
					var punc = stringArr[i].match(/[?!.,:;]+/)
					var prop = stringArr[i].replace(/[*]+/gi, "")
					prop = prop.match(/[A-Za-z0-9_]+/gi)[0]
					var data = formData[prop];
					stringArr[i] =  '<span class="color-me">' + (data || ("**" + stringArr[i].match(/\w+/)) + "**") + (punc || "") + ' </span>'.replace("  ", " ");
				}
			}
			return  stringArr.join(" ")
		})
		var html = end.map((data) => {
			return "<p>" + data + "</p>";
		})
		console.log(html)
		return html.join(" ");
	}

	preserveFormat(string) {
		var strings = string.split("\n")
		var html = strings.map((data) => {
			return "<p>" + data + "<p>";
		})
		return html.join(" ");
	}

	updateTemplateEmitter = new EventEmitter();
	newFlagEmitter = new EventEmitter<boolean>();
	emitTemplateIndex = new EventEmitter<number>();
}