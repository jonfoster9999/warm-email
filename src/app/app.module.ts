import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
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
// import { EmailMainComponent } from './email/email-main/email-main.component';
// import { EmailAddComponent } from './email/email-add/email-add.component';
// import { EmailMain2Component } from './email/email-main-2/email-main-2.component';
import { TemplateHomeComponent } from './templates/template-home/template-home.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsersService } from './services/users.service';
import { CanActivateViaUserService } from './guards/guard'
import { CanActivateHome } from './guards/homeguard';
import { TemplatefilterPipe } from './pipes/templatefilter.pipe';
import { AboutComponent } from './about/about.component';

export class CustomOption extends ToastOptions {
  animate = 'fade'; // you can override any options available
  newestOnTop = false;
  messageClass: 'toast-message';
  titleClass: 'toast-title';
  positionClass = 'toast-bottom-right';
}


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
    // EmailMainComponent,
    // EmailAddComponent,
    // EmailMain2Component,
    TemplateHomeComponent,
    HomeComponent,      
    LoginComponent, TemplatefilterPipe, AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    AppRoutes,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [
          TemplatesService, 
          TemplateResolve, 
          UsersService,
          CanActivateViaUserService,
          CanActivateHome,
          {provide: ToastOptions, useClass: CustomOption}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
