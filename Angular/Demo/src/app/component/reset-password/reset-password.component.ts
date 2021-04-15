import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EMAIL_STATUS } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';

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

  // @HostListener('input') oninput() {

  //   if (this.contactForm.valid) {
  //     this.disabledSubmitButton = false;
  //   }
  // }

  constructor(private fb: FormBuilder, private commonservice: CommonService) {  }

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

  onSubmit() {
    
    this.commonservice.sendMessage(this.resetpasswordForm.value).subscribe(() => {
      alert('Check Your Email, OTP is send for Varification.');
      // this.contactForm.reset();
      // this.disabledSubmitButton = true;
      
      
    }, (error: any) => {
      console.log('Error', error);
    });
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
    // this.resetemail();
    if(this.emailInputOtp === this.emailOtp){
      this.otp1 = ! this.otp1;
      this.emailOTPVerify =true;
    } else {
      alert('Please enter correct OTP');
    }
    
  }

  sendemailotp(){
    
    console.log(this.emailInputValue);
    this.commonservice.emailVerificationAtRegistaration(this.emailInputValue).subscribe(res =>{
        console.log('data=> ', res);
        if(res.status === EMAIL_STATUS){
          alert('This Email already Exie');
        } else {
          this.emailOtp = res.otp;
          this.otp1 = ! this.otp1;
          this.sendemailotpDisable = true;
        }
    });

    // this.commonService.fileDownload('data').subscribe(res=>{
    //   // http://8066d19ccc37.ngrok.io
    //   window.open(environment.baseURL+res.path);
    // })

    
  }

  
}
