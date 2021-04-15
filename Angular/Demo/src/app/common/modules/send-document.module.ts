import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendDocumentComponent } from 'src/app/component/send-document/send-document.component';


const routes: Routes = [
  {
    path: '',
    component: SendDocumentComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class SendDocumentModule { }
