import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from '../templates/templates.component'
import { TemplateDetailsComponent } from '../templates/template-details/template-details.component';
import { TemplateNewComponent } from '../templates/template-new/template-new.component';
import { EmailComponent } from '../email/email.component';
import { TemplateEditComponent } from '../templates/template-edit/template-edit.component';
import { TemplateResolve } from '../resolvers/template.resolver';


const appRoutes = [
	{ path: "", component: TemplatesComponent, pathMatch: "full"},
	{ path: "templates", component: TemplatesComponent, children: [
		{ path: "new", component: TemplateNewComponent},
		{ path: ":id", component: TemplateDetailsComponent, pathMatch: "full"},
		{ path: ":id/edit", component: TemplateEditComponent, resolve: {template: TemplateResolve}, pathMatch: "full"},
		{ path: ":id/email", component: EmailComponent, resolve: {template: TemplateResolve}, pathMatch: "full"}
	]}
	// 	,
	// { path: "emails", component: EmailComponent }
]

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutes {}
