import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { WARNING_HEADER, ENTER_OTP, WARNING_IMG, WARNING_COLOR, DELETE_ACCOUNT_MSG, SUCCESS_COLOR, SUCCESS_HEADER, SUCCESS_IMG } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';

@Component({
  selector: 'app-delete-popup-modal',
  templateUrl: './delete-popup-modal.component.html',
  styleUrls: ['./delete-popup-modal.component.scss'],
})
export class DeletePopupModalComponent implements OnInit {
  header = '';
  otpdata = '';
  alertType = '';
  alertcolor = '';
  email= '';
  nameVal = '';
  userIdVal= '';
  
  

  //disable-enable buttons

  verifyotp:boolean = false;
  resendotp:boolean = true;
  okbtn:boolean = true;
  commentarea:boolean = true;
  otp:boolean = false;

  constructor(
    private _mdr: MatDialogRef<DeletePopupModalComponent>,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private customCommonService: CustomCommonService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.header = data.header;
    this.alertType = data.alertType;
    this.alertcolor = data.alertcolor;
    this.otpdata = data.otpdata;
    this.email = data.email;
    this.nameVal = data.name;
    this.userIdVal = data.userId;
  }

  deletePopup = this.formBuilder.group({
    comments: ['', Validators.required],
    deleteOtp: ['', Validators.required],
  });

  ngOnInit(): void {}

  get g() {
    return this.deletePopup.controls;
  }

  CloseDialog() {
    this._mdr.close(false);
  }

  deleteModalOk() {
    if(this.deletePopup.valid){
      const data ={
        name: this.nameVal,
        send_Copy: this.userIdVal,
        email_id: this.email,
        comment: this.deletePopup.value.comments
      }
      this.commonService.deleteUserAccount(data).subscribe(res=>{
        this.deleteModalClose();
        this.customCommonService.OpenModal(SUCCESS_HEADER,res.status,SUCCESS_IMG,SUCCESS_COLOR,'');
      }, error =>{      
        this.customCommonService.errorHandling(error);
        this.deleteModalClose();
      });
    }
  }

  otpVerify() {

    const rTime = this.customCommonService.timeSpamCalculation();
      const data = {
        id: this.deletePopup.value.deleteOtp,
        f_name: this.otpdata,
        l_name: rTime,
      };

      this.commonService.checkOTPViewAfterLogin(data).subscribe(
        (res) => {
          if (res.status === 'True') {
            this.commentarea = false;
          }
        }, error =>{ 
          this.customCommonService.OpenModal(WARNING_HEADER,ENTER_OTP,WARNING_IMG,WARNING_COLOR,'');
         }
      );
    
    // if(this.otpdata == this.deletePopup.value.deleteOtp){
    //   // this.resendotp = false;
    //   this.commentarea = false;
    // } else {
    //   this.customCommonService.OpenModal(WARNING_HEADER,ENTER_OTP,WARNING_IMG,WARNING_COLOR,'');
    // }
    // this.otp = true;
  }

  otpReset() {
    this.resendotp = true;
    this.commentarea = true;
    const data ={
      name: this.customCommonService.userName,
      email_id: this.email,
      subject: DELETE_ACCOUNT_MSG
    }
    this.commonService.getOtpDelete(data).subscribe(res=>{
      if(res.resquest_timestamp){
        this.otpdata = res.resquest_timestamp;
      }else {
        this.customCommonService.OpenModal(WARNING_HEADER,res.status,WARNING_IMG,WARNING_COLOR,'');
      }
       
    }, error =>{      
      this.customCommonService.errorHandling(error);
      this.deleteModalClose();
    });
  }

  deleteModalClose() {
    this._mdr.close(false);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

}
