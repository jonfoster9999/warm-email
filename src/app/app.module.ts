import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TemplatesComponent } from './templates/templates.component';
import { TemplatesService } from './services/templates.service';
import { TemplateNavigationComponent } from './templates/template-navigation/template-navigation.component';
import { TemplateDetailsComponent } from './templates/template-details/template-details.component';
import { Property } from './models/property.model';
import { Template} from './models/template.model';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TemplatesComponent,
    TemplateNavigationComponent,
    TemplateDetailsComponent,
    Property,
    Template
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule
  ],
  providers: [TemplatesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
