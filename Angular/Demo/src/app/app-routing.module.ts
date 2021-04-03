import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocTransactionComponent } from './component/doc-transaction/doc-transaction.component';
import { DocUploadComponent } from './component/doc-upload/doc-upload.component';
import { LoginPageComponent } from './component/login-page/login-page.component';
import { RegistrationPageComponent } from './component/registration-page/registration-page.component';

const routes: Routes = [
  { path:'register', component: RegistrationPageComponent},
  { path:'login', component: LoginPageComponent},
  { path:'doc', component: DocUploadComponent},
  { path:'doctransation', component: DocTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
