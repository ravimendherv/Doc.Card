import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocTransactionComponent } from 'src/app/component/doc-transaction/doc-transaction.component';


const routes: Routes = [
  {
    path: '',
    component: DocTransactionComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class DocTransactionModule { }
