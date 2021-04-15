import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EMAIL_STATUS } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';
import { environment } from 'src/environments/environment';
// import { PassThrough } from 'node:stream';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  hide1: boolean = true;
  hide2: boolean = true;

  otp1: boolean = false;
  otp2: boolean = false;
  dumyemailotp = '123456';
  emailOTPVerify= false;
  mobileOTPVerify= false;
  sendemailotpDisable = false;
  sendmobileotpDisable = false;
  emailInputValue = '';
  mobileInputValue = 0;
  emailOtp = '';
  emailInputOtp = '';
  mobileOtp = '';
  mobileInputOtp = '';

  ngOnInit(): void {  }

  constructor(private formbuilder:FormBuilder, private commonService: CommonService) { }

  regform = this.formbuilder.group({

    firstname:['', Validators.required],
    lastname:['', Validators.required],
    dob:['', Validators.required],
    gender:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    mobile:['', Validators.required],
    usertype:['', Validators.required],
    password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    confirmpassword:['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    emailotp:['', Validators.required],
    mobileotp:['', Validators.required]

  },
  {
    validator: this.MustMatch('password', 'confirmpassword'),
    // validator1: this.ValidateEmail('email')
  },
  
  );

  

  saveform(){
    console.log('Form data is ', this.regform.value);
  };

  get g(){
    return this.regform.controls;
  };

  registersubmit(){
     console.log(this.regform.value);
    if (this.regform.valid) {  
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');  
      // console.table(this.regform.value);  
        const data = {
          "email": this.regform.value.email,
          "username": "",
          "password": this.regform.value.password,
          "first_name": this.regform.value.firstname,
          "last_name": this.regform.value.lastname
        }
      this.commonService.createUser(data).subscribe(res=>{

          if(this.regform.value.usertype == '0'){
            const sdata = {
              "id": res.id,
              "doc_id": res.username,
              "f_name": this.regform.value.firstname,
              "l_name": this.regform.value.lastname,
              "email_id": this.regform.value.email,
              "mobile_no": this.regform.value.mobile,
              "dob": this.regform.value.dob.getFullYear()+'-'+this.regform.value.dob.getMonth()+'-'+this.regform.value.dob.getDate(),
              "user_type": this.regform.value.usertype,
              "gender": this.regform.value.gender
            }

            const sKey = {
              "id": res.id,
              "doc_id": res.username,
              "date": this.regform.value.dob.getDate(),
              "month": this.regform.value.dob.getMonth(),
              "year": this.regform.value.dob.getFullYear()
            }

            this.commonService.senderRegistration(sdata).subscribe(x=>{

            });

            this.commonService.senderKey(sKey).subscribe(s=>{
                alert('user Created')
                this.regform.reset(this.regform.value);
            });

          } else if(this.regform.value.usertype == '1'){
            const rdata = {
              "id": res.id,
              "doc_id": res.username,
              "f_name": this.regform.value.firstname,
              "l_name": this.regform.value.lastname,
              "email_id": this.regform.value.email,
              "mobile_no": this.regform.value.mobile,
              "dob": this.regform.value.dob.getFullYear()+'-'+this.regform.value.dob.getMonth()+'-'+this.regform.value.dob.getDate(),
              "user_type": this.regform.value.usertype,
              "gender": this.regform.value.gender
            }

            this.commonService.receicerRegistration(rdata).subscribe(y=>{
              alert('user Created')
              this.regform.reset(this.regform.value);
            });
    
          }
      });

      

    }else{
      alert('Please Fill All the Details.');
    }
  };

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  };
  

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

  };


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
    this.commonService.emailVerificationAtRegistaration(this.emailInputValue).subscribe(res =>{
        console.log('data=> ', res);
        if(res.status === EMAIL_STATUS){
          alert('This Email already Exists');
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


  //======= mobile Logic ===========

  resetmobile(){
    this.otp2 = ! this.otp2;
    this.sendmobileotpDisable = false;
  }
 
  verifymobile(){
    if(this.mobileInputOtp === this.mobileOtp){
      this.otp2 = ! this.otp2;
      this.mobileOTPVerify =true;
    } else {
      alert('Please enter correct OTP');
    }
  };

  sendmobileotp(){
    

    console.log(this.mobileInputValue);
    this.commonService.smsVerificationAtRegistaration(this.mobileInputValue.toString()).subscribe(res =>{
        // console.log('data=> ', res);
        if(res.status === EMAIL_STATUS){
          alert('This Mobile no already Exie');
        } else {
          this.mobileOtp = res.otp;
          this.otp2 = ! this.otp2;
          this.sendmobileotpDisable = true;
        }
    });
  };

  mobileInput(event: any ){
    const inputValue = event.target.value;
    this.mobileInputValue = inputValue;
    // console.log(inputValue);
  }
  mOTP(event: any ){
    const inputValue = event.target.value;
    this.mobileInputOtp = inputValue;
    // console.log(inputValue);
  }

  

  // otpemail(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //       const control = formGroup.controls[controlName];
  //       const matchingControl = formGroup.controls[matchingControlName];

  //       if (matchingControl.errors && !matchingControl.errors.otpemail) {
  //           // return if another validator has already found an error on the matchingControl
  //           return;
  //       }

  //       // set error on matchingControl if validation fails
  //       if (control.value !== matchingControl.value) {
  //           matchingControl.setErrors({ otpemail: true });
  //       } else {
  //           matchingControl.setErrors(null);
  //       }
  //   }

  // };

};