import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceivedDocumentComponent } from '../received-document.component';

const routes: Routes = [
  {
    path: '',
    component: ReceivedDocumentComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class ReceiveDocumentModule { }
