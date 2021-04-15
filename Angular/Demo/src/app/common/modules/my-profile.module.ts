import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProfileComponent } from 'src/app/component/my-profile/my-profile.component';


const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,
  }

]

@NgModule({
  imports: [ RouterModule.forChild(routes)  ],
  exports: [ RouterModule],
})
export class MyProfileModule { }
