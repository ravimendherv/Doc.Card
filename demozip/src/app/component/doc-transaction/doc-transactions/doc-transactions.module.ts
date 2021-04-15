import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocTransactionComponent } from '../doc-transaction.component';

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
export class DocTransactionsModule { }
