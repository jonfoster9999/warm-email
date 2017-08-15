import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from '../templates/templates.component'
import { TemplateDetailsComponent } from '../templates/template-details/template-details.component';
import { TemplateNewComponent } from '../templates/template-new/template-new.component';
import { EmailComponent } from '../email/email.component';
import { TemplateEditComponent } from '../templates/template-edit/template-edit.component';
import { TemplateResolve } from '../resolvers/template.resolver';
import { TemplateHomeComponent } from '../templates/template-home/template-home.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { CanActivateViaUserService } from '../guards/guard'
import { CanActivateHome } from '../guards/homeguard'
import { AboutComponent } from '../about/about.component'


const appRoutes = [
	{ path: "", component: HomeComponent, canActivate: [
		 CanActivateHome
		], pathMatch: "full"},
	{ path: "login", component: LoginComponent},
	{ path: "templates", component: TemplatesComponent, canActivate: [
		 CanActivateViaUserService
		], children: [
		{ path: "", component: TemplateHomeComponent },
		{ path: "new", component: TemplateNewComponent},
		{ path: ":id", component: TemplateDetailsComponent, pathMatch: "full"},
		{ path: ":id/edit", component: TemplateEditComponent, resolve: {template: TemplateResolve}, pathMatch: "full"},
		{ path: ":id/email", component: EmailComponent, pathMatch: "full"}
	]},
	{ path: "about", component: AboutComponent }
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
