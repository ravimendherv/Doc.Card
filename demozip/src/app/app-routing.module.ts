import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './common/component/contact-us/contact-us.component';
import { ReceiverDashboardComponent } from './component/dashboard/receiver-dashboard/receiver-dashboard.component';
import { SenderDashboardComponent } from './component/dashboard/sender-dashboard/sender-dashboard.component';
// import { DocTransactionComponent } from './component/doc-transaction/doc-transaction.component';
// import { DocUploadComponent } from './component/doc-upload/doc-upload.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { LoginTwoFactorAuthComponent } from './component/login-page/login-two-factor-auth/login-two-factor-auth.component';
// import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { RegistrationPageComponent } from './component/registration-page/registration-page.component';

const routes: Routes = [
  { path:'register', component: RegistrationPageComponent},
  { path:'login', component: LoginPageComponent},
  // { path:'doc', component: DocUploadComponent},
  // { path:'doctransation', component: DocTransactionComponent},
  { path:'sender-dashboard', component:SenderDashboardComponent,
    children: [
        // { path: 'doc', component: DocUploadComponent },
      {
        path: 'doc',
        loadChildren: () => import ('./component/doc-upload/doc-uploads/doc-uploads.module').then(m=>m.DocUploadsModule)
      },
      {
        path: 'doctransation',
        loadChildren: () => import ('./component/doc-transaction/doc-transactions/doc-transactions.module').then(m=>m.DocTransactionsModule)
      },
      {
        path: 'myprofile',
        loadChildren: () => import ('./component/my-profile/profile/profile.module').then(m=>m.ProfileModule)
      },
      {
        path: 'sendfile',
        loadChildren: () => import ('./component/sendfiles/sendfile/sendfile.module').then(m=>m.SendfileModule)
      },
      {
        path: 'doccard',
        loadChildren: () => import ('./component/doc-card/doc-card-module/doc-card-module.module').then(m=>m.DocCardModuleModule)
      }

    ]
  },
  { path:'receiver-dashboard', component:ReceiverDashboardComponent,
    children: [
        
      {
        path: 'doc',
        loadChildren: () => import ('./component/doc-upload/doc-uploads/doc-uploads.module').then(m=>m.DocUploadsModule)
      },
      {
        path: 'doctransation',
        loadChildren: () => import ('./component/doc-transaction/doc-transactions/doc-transactions.module').then(m=>m.DocTransactionsModule)
      },
      {
        path: 'myprofile',
        loadChildren: () => import ('./component/my-profile/profile/profile.module').then(m=>m.ProfileModule)
      },
      {
        path: 'notify',
        loadChildren: () => import ('./component/notification/notifications/notifications.module').then(m=>m.NotificationsModule)
      },
      {
        path: 'receivedoc',
        loadChildren: () => import ('./component/received-document/receive-document/receive-document.module').then(m=>m.ReceiveDocumentModule)
      }
      
    ]
  },
  { path:'contactUs', component: ContactUsComponent},
  { path:'loginFactor', component: LoginTwoFactorAuthComponent},
  // { path:'myprofile', component: MyProfileComponent},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
