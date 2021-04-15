import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocUploadComponent } from 'src/app/component/doc-upload/doc-upload.component';


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
export class DocUploadModule { }
