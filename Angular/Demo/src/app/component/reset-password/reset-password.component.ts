import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BACKEND_FAILE_0, EMAIL_STATUS, ENTER_OTP, ERROR_COLOR, ERROR_HEADER, ERROR_IMG, PASSWORD_RESET_SUCCESSFULLY, SUCCESS_COLOR, SUCCESS_HEADER, SUCCESS_IMG, WARNING_COLOR, WARNING_HEADER, WARNING_IMG } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';
import { MatDialog } from "@angular/material/dialog";
import { CustomCommonService } from 'src/app/common/services/custom-common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  
  // resetpasswordForm: FormGroup;
  hide1: boolean = true;
  hide2: boolean = true;
  otp1: boolean = false;
  emailInputValue = '';
  emailOTPVerify= false;
  sendemailotpDisable = false;
  emailOtp = '';
  emailInputOtp = '';
  hidepass:boolean = true;
  userId: string ='';

  // @HostListener('input') oninput() {

  //   if (this.contactForm.valid) {
  //     this.disabledSubmitButton = false;
  //   }
  // }


  constructor(private fb: FormBuilder, private commonservice: CommonService, private router: Router,private matDialog: MatDialog, private customCommonService: CustomCommonService ) {  }

    resetpasswordForm = this.fb.group({
    resetpasswordFormEmail: ['', Validators.compose([Validators.required, Validators.email])],
    password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    confirmpassword:['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    emailotp:['', Validators.required]
    // 'contactFormCopy': [false],
    },
    {
      validator: this.MustMatch('password', 'confirmpassword'),
      // validator1: this.ValidateEmail('email')
    });

  ngOnInit(): void {
  }

  get g(){
    return this.resetpasswordForm.controls;
  }


  // OpenModal(headerVal: string,msgVal: string,alertypeVal: string,alertcolorVal: string) {
  //   this.matDialogRef = this.matDialog.open(PopupModalComponent, {
  //     data: { 
  //       header: headerVal,
  //       msgBody: msgVal,
  //       alertType: alertypeVal,
  //       alertcolor: alertcolorVal
  //     },
  //     disableClose: true
  //   });

  //   this.matDialogRef.afterClosed().subscribe(res => {
  //     if ((res == true)) {
  //       this.name = "";
  //     }
  //   });
  // }

  onSubmit() {

    
    if(this.resetpasswordForm.valid){
      const data ={
        "password": this.resetpasswordForm.value.confirmpassword
      }
      this.commonservice.resetPass(data,this.userId).subscribe(res=>{
          console.log(res);
          
      // this.disabledSubmitButton = true;
      this.emailOTPVerify =false;
      this.customCommonService.OpenModal(SUCCESS_HEADER,PASSWORD_RESET_SUCCESSFULLY,SUCCESS_IMG,SUCCESS_COLOR,'');
      this.router.navigateByUrl('/login');
      this.resetpasswordForm.reset();
      }, error=>{
        this.customCommonService.errorHandling(error);   
      })
    }
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }

  }

   //============ Email Logic =============

   resetemail(){
    this.otp1 = ! this.otp1;
    this.sendemailotpDisable = false;
  }

  emailInput(event: any ){
    const inputValue = event.target.value;
    this.emailInputValue = inputValue;
    // console.log(inputValue);
  }
  eOTP(event: any ){
    const inputValue = event.target.value;
    this.emailInputOtp = inputValue;
    // console.log(inputValue);
  }

  verifyemail(){
    this.hidepass = false;
    // this.resetemail();
    if(this.emailInputOtp === this.emailOtp){
      this.otp1 = ! this.otp1;
      this.emailOTPVerify =true;
    } else {
      this.customCommonService.OpenModal(WARNING_HEADER,ENTER_OTP,WARNING_IMG,WARNING_COLOR,'');
    }
    
  }

  sendemailotp(){
    
    console.log(this.emailInputValue);

    const data = {
      "email": this.emailInputValue
    }

    this.commonservice.forgotPass(data).subscribe(res=>{
      console.log(res);
      this.userId = res.id;
      this.emailOtp = res.otp;
          this.otp1 = ! this.otp1;
          this.sendemailotpDisable = true;
    }, error=>{
      this.customCommonService.errorHandling(error);  
    });
  }

  
}
