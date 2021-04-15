import { NgModule } from '@angular/core';
import { DocUploadComponent } from '../doc-upload.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DocUploadComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class DocUploadsModule { }
