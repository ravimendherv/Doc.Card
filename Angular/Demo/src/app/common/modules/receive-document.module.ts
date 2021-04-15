import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiveDocumentComponent } from 'src/app/component/receive-document/receive-document.component';


const routes: Routes = [
  {
    path: '',
    component: ReceiveDocumentComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class ReceiveDocumentModule { }
