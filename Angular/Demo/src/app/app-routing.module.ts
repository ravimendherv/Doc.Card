import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactUsComponent } from './common/component/contact-us/contact-us.component';
import { ReceiverDashboardComponent } from './component/dashboard/receiver-dashboard/receiver-dashboard.component';
import { SenderDashboardComponent } from './component/dashboard/sender-dashboard/sender-dashboard.component';
import { DocTransactionComponent } from './component/doc-transaction/doc-transaction.component';
import { DocUploadComponent } from './component/doc-upload/doc-upload.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegistrationPageComponent } from './component/registration-page/registration-page.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

const routes: Routes = [
  { path:'register', component: RegistrationPageComponent},
  { path:'login', component: LoginPageComponent},
  { path:'contactUs', component: ContactUsComponent},
  { path:'reset-password', component: ResetPasswordComponent},

  { path:'sender_dashboard', component:SenderDashboardComponent,
    children: [
      {
        path: 'doc',
        loadChildren: () => import ('./common/modules/doc-upload.module').then(m=>m.DocUploadModule)
      },
      {
        path: 'doctransation',
        loadChildren: () => import ('./common/modules/doc-transaction.module').then(m=>m.DocTransactionModule)
      },
      {
        path: 'myprofile',
        loadChildren: () => import ('./common/modules/my-profile.module').then(m=>m.MyProfileModule)
      },
      {
        path: 'sendfile',
        loadChildren: () => import ('./common/modules/send-document.module').then(m=>m.SendDocumentModule)
      },
      {
        path: 'doccard',
        loadChildren: () => import ('./common/modules/doc-card.module').then(m=>m.DocCardModule)
      }

    ]
  },
  { path:'receiver_dashboard', component:ReceiverDashboardComponent,
    children: [
      {
        path: 'doctransation',
        loadChildren: () => import ('./common/modules/doc-transaction.module').then(m=>m.DocTransactionModule)
      },
      {
        path: 'myprofile',
        loadChildren: () => import ('./common/modules/my-profile.module').then(m=>m.MyProfileModule)
      },
      {
        path: 'notify',
        loadChildren: () => import ('./common/modules/notifications.module').then(m=>m.NotificationsModule)
      },
      {
        path: 'receivedoc',
        loadChildren: () => import ('./common/modules/receive-document.module').then(m=>m.ReceiveDocumentModule)
      }
      
    ]
  },
  // { path:'sender_dashboard', component: SenderDashboardComponent},
  // { path:'doc', component: DocUploadComponent},
  // { path:'doctransation', component: DocTransactionComponent},
  // { path:'receiver_dashboard', component: ReceiverDashboardComponent},
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
