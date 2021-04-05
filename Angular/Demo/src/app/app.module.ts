import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { MaterialModule } from './common/modules/material.module';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegistrationPageComponent } from './component/registration-page/registration-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './common/component/file-upload/file-upload.component';
import { DocUploadComponent } from './component/doc-upload/doc-upload.component';
import { DocTransactionComponent } from './component/doc-transaction/doc-transaction.component';
import { LegendComponent } from './common/component/legend/legend.component';
import { TableLayoutComponent } from './common/component/table-layout/table-layout.component';
import { ContactUsComponent } from './common/component/contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    FileUploadComponent,
    DocUploadComponent,
    DocTransactionComponent,
    LegendComponent,
    TableLayoutComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
