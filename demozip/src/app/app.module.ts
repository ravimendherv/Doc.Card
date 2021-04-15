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
import { ContactUsComponent } from './common/component/contact-us/contact-us.component';
import { SenderDashboardComponent } from './component/dashboard/sender-dashboard/sender-dashboard.component';
import { LoginTwoFactorAuthComponent } from './component/login-page/login-two-factor-auth/login-two-factor-auth.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { ReceiverDashboardComponent } from './component/dashboard/receiver-dashboard/receiver-dashboard.component';
import { SendfilesComponent } from './component/sendfiles/sendfiles.component';
import { DocCardComponent } from './component/doc-card/doc-card.component';
import { NotificationComponent } from './component/notification/notification.component';
import { ReceivedDocumentComponent } from './component/received-document/received-document.component';
// import { MyProfileComponent } from './common/my-profile/my-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    FileUploadComponent,
    DocUploadComponent,
    DocTransactionComponent,
    LegendComponent,
    ContactUsComponent,
    SenderDashboardComponent,
    LoginTwoFactorAuthComponent,
    MyProfileComponent,
    ReceiverDashboardComponent,
    SendfilesComponent,
    DocCardComponent,
    NotificationComponent,
    ReceivedDocumentComponent
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
