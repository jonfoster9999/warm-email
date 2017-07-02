import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplatesService } from './services/templates.service';
import { TemplateNavigationComponent } from './templates/template-navigation/template-navigation.component';
import { TemplateDetailsComponent } from './templates/template-details/template-details.component';
import { Property } from './models/property.model';
import { Template} from './models/template.model';
import { EmailComponent } from './email/email.component';
import { AppRoutes } from './routes/app-routes.module';
import { TemplateNewComponent } from './templates/template-new/template-new.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { TemplateEditComponent } from './templates/template-edit/template-edit.component';
import { TemplateResolve } from './resolvers/template.resolver';
import { EmailMainComponent } from './email/email-main/email-main.component';
import { EmailAddComponent } from './email/email-add/email-add.component';
import { EmailMain2Component } from './email/email-main-2/email-main-2.component';
import { TemplateHomeComponent } from './templates/template-home/template-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersService } from './services/users.service';
import { CanActivateViaUserService } from './guards/guard'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TemplatesComponent,
    TemplateNavigationComponent,
    TemplateDetailsComponent,
    EmailComponent,
    TemplateNewComponent,
    SafeHtmlPipe,
    TemplateEditComponent,
    EmailMainComponent,
    EmailAddComponent,
    EmailMain2Component,
    TemplateHomeComponent,
    HomeComponent,      
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    AppRoutes,
    ReactiveFormsModule
  ],
  providers: [
          TemplatesService, 
          TemplateResolve, 
          UsersService,
          CanActivateViaUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
