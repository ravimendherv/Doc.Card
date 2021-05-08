import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DeletePopupModalComponent } from 'src/app/component/my-profile/delete-popup-modal/delete-popup-modal.component';
import { MyProfileComponent } from 'src/app/component/my-profile/my-profile.component';
import { MaterialModule } from './material.module';

const routes: Routes = [
  {
    path: '',
    component: MyProfileComponent,    
  },
];

@NgModule({
  declarations: [DeletePopupModalComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, HttpClientModule],
  exports: [RouterModule],
})
export class MyProfileModule {}
