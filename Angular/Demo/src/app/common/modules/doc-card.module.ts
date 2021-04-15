import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocCardComponent } from 'src/app/component/doc-card/doc-card.component';

const routes: Routes = [
  {
    path: '',
    component: DocCardComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class DocCardModule { }
