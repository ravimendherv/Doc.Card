import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendfilesComponent } from '../sendfiles.component';

const routes: Routes = [
  {
    path: '',
    component: SendfilesComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class SendfileModule { }
