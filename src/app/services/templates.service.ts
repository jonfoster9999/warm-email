import { Template } from "../models/template.model";
import { EventEmitter } from "@angular/core";

export class TemplatesService {
	emitTemplateIndex = new EventEmitter<number>();
}