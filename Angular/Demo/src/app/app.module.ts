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
import { SenderDashboardComponent } from './component/dashboard/sender-dashboard/sender-dashboard.component';
import { ReceiverDashboardComponent } from './component/dashboard/receiver-dashboard/receiver-dashboard.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { PageLoaderComponent } from './common/component/page-loader/page-loader.component';
import { DocCardComponent } from './component/doc-card/doc-card.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { NotificationComponent } from './component/notification/notification.component';
import { SendDocumentComponent } from './component/send-document/send-document.component';
import { ReceiveDocumentComponent } from './component/receive-document/receive-document.component';


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
    ContactUsComponent,
    SenderDashboardComponent,
    ReceiverDashboardComponent,
    ResetPasswordComponent,
    PageLoaderComponent,
    DocCardComponent,
    MyProfileComponent,
    NotificationComponent,
    SendDocumentComponent,
    ReceiveDocumentComponent
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
