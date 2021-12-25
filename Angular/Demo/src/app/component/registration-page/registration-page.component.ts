import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  EMAIL_EXISTS,
  EMAIL_STATUS,
  ENTER_OTP,
  ENTER_OTP_TIME,
  FILL_ALL_DETAILS,
  MOBILE_EXISTS,
  SUCCESS_COLOR,
  SUCCESS_HEADER,
  SUCCESS_IMG,
  USER_CRETED,
  WARNING_COLOR,
  WARNING_HEADER,
  WARNING_IMG,
} from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';
import { environment } from 'src/environments/environment';
// import { PassThrough } from 'node:stream';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  hide1: boolean = true;
  hide2: boolean = true;

  otp1: boolean = false;
  otp2: boolean = false;
  dumyemailotp = '123456';
  emailOTPVerify = false;
  mobileOTPVerify = false;
  sendemailotpDisable = false;
  sendmobileotpDisable = false;
  emailInputValue = '';
  mobileInputValue = 0;
  emailOtp = '';
  emailInputOtp = '';
  mobileOtp = '';
  mobileInputOtp = '';
  loaderval = false;
  dobVal = '';

  emailStatusValue = false;
  requestTimeEmail = '';
  mobileStatusValue = false;
  requestTimeMobile = '';

  ngOnInit(): void {}

  constructor(
    private formbuilder: FormBuilder,
    private commonService: CommonService,
    private customCommonService: CustomCommonService
  ) {}

  d: string = '';
  m: string = '';

  regform = this.formbuilder.group(
    {
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      usertype: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      confirmpassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
        ],
      ],
      emailotp: ['', Validators.required],
      mobileotp: ['', Validators.required],
    },
    {
      validator: this.MustMatch('password', 'confirmpassword'),
      // validator1: this.ValidateEmail('email')
    }
  );

  saveform() {
    console.log('Form data is ', this.regform.value);
  }

  get g() {
    return this.regform.controls;
  }

  registersubmit() {
    this.loaderval = true;
    console.log(this.regform.value);
    if (this.regform.valid) {
      let g = this.regform.value.dob.getDate();
      let h = this.regform.value.dob.getMonth();

      h = +h + 1;

      if (g < 10) {
        this.d = '0' + g;
      } else {
        this.d = '' + g;
      }

      if (h < 10) {
        this.m = '0' + h;
      } else {
        this.m = '' + h;
      }

      const data = {
        email: this.regform.value.email,
        username: '',
        password: this.regform.value.password,
        first_name: this.regform.value.firstname,
        last_name: this.regform.value.lastname,
      };
      this.commonService.createUser(data).subscribe(
        (res) => {
          if (this.regform.value.usertype == '0') {
            const sdata = {
              id: res.id.toString(),
              doc_id: res.username,
              f_name: this.regform.value.firstname,
              l_name: this.regform.value.lastname,
              email_id: this.regform.value.email,
              mobile_no: this.regform.value.mobile,
              dob:
                this.regform.value.dob.getFullYear() +
                '-' +
                this.m +
                '-' +
                this.d,
              user_type: this.regform.value.usertype,
              gender: this.regform.value.gender,
            };

            const sKey = {
              id: res.id,
              doc_id: res.username,
              date: this.d,
              month: this.m,
              year: this.regform.value.dob.getFullYear(),
            };

            this.commonService.senderRegistration(sdata).subscribe(
              (x) => {},
              (error) => {
                this.customCommonService.errorHandling(error);
              }
            );

            this.commonService.senderKey(sKey).subscribe(
              (s) => {
                this.loaderval = false;
                this.customCommonService.OpenModal(
                  SUCCESS_HEADER,
                  USER_CRETED,
                  SUCCESS_IMG,
                  SUCCESS_COLOR,
                  '/login'
                );
                this.resetlogin();
                this.regform.reset(this.regform.value);
              },
              (error) => {
                this.customCommonService.errorHandling(error);
              }
            );
          } else if (this.regform.value.usertype == '1') {
            const rdata = {
              id: res.id.toString(),
              doc_id: res.username,
              f_name: this.regform.value.firstname,
              l_name: this.regform.value.lastname,
              email_id: this.regform.value.email,
              mobile_no: this.regform.value.mobile,
              dob:
                this.regform.value.dob.getFullYear() +
                '-' +
                this.m +
                '-' +
                this.d,
              user_type: this.regform.value.usertype,
              gender: this.regform.value.gender,
            };

            this.commonService.receicerRegistration(rdata).subscribe(
              (y) => {
                this.loaderval = false;
                this.customCommonService.OpenModal(
                  SUCCESS_HEADER,
                  USER_CRETED,
                  SUCCESS_IMG,
                  SUCCESS_COLOR,
                  ''
                );
                this.resetlogin();
                this.regform.reset(this.regform.value);
              },
              (error) => {
                this.customCommonService.errorHandling(error);
              }
            );
          }
        },
        (error) => {
          this.customCommonService.errorHandling(error);
        }
      );

      this.emailOTPVerify = false;
      this.mobileOTPVerify = false;
    } else {
      this.customCommonService.OpenModal(
        WARNING_HEADER,
        FILL_ALL_DETAILS,
        WARNING_IMG,
        WARNING_COLOR,
        ''
      );
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  firstLastNamekeyPress(event: any) {
    const pattern = /[A-Za-z]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
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
    };
  }

  //============ Email Logic =============

  resetemail() {
    this.otp1 = !this.otp1;
    this.sendemailotpDisable = false;
  }

  emailInput(event: any) {
    const inputValue = event.target.value;
    this.emailInputValue = inputValue;
    // console.log(inputValue);
  }
  eOTP(event: any) {
    const inputValue = event.target.value;
    this.emailInputOtp = inputValue;
    // console.log(inputValue);
  }

  verifyemail() {
    // this.resetemail();
    if (this.emailStatusValue) {
      // this.otp1 = ! this.otp1;
      // this.emailOTPVerify =true;
      this.loaderval = true;
      const rTime = this.customCommonService.timeSpamCalculation();
      const data = {
        id: this.regform.value.emailotp,
        f_name: this.requestTimeEmail,
        l_name: rTime,
      };

      this.commonService.checkOTPView(data).subscribe(
        (res) => {
          this.loaderval = false;
          if (res.status === 'True') {
            this.otp1 = !this.otp1;
            this.emailOTPVerify = true;
          }
        },
        (error) => {
          this.loaderval = false;
          if (error === 400) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else if (error === 401) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP_TIME,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else {
            this.customCommonService.errorHandling(error);
          }

          // this.customCommonService.errorHandling(error);
        }
      );
    } else {
      this.customCommonService.OpenModal(
        WARNING_HEADER,
        ENTER_OTP,
        WARNING_IMG,
        WARNING_COLOR,
        ''
      );
    }
  }

  sendemailotp() {
    console.log('d: ', typeof this.d, 'm: ', typeof this.m);
    console.log('Date: ', this.d, ' Month: ', this.m);

    console.log(this.emailInputValue);
    this.commonService
      .emailVerificationAtRegistaration(this.emailInputValue)
      .subscribe(
        (res) => {
          console.log('data=> ', res);

          if (res.status !== 'True') {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              EMAIL_EXISTS,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else {
            this.emailStatusValue = true;
            this.requestTimeEmail = res.resquest_timestamp;
            this.otp1 = !this.otp1;
            this.sendemailotpDisable = true;
          }
        },
        (error) => {
          this.customCommonService.errorHandling(error);
        }
      );

    // this.commonService.fileDownload('data').subscribe(res=>{
    //   // http://8066d19ccc37.ngrok.io
    //   window.open(environment.baseURL+res.path);
    // })
  }

  //======= mobile Logic ===========

  resetmobile() {
    this.otp2 = !this.otp2;
    this.sendmobileotpDisable = false;
  }

  verifymobile() {
    if (this.mobileStatusValue) {
      // this.otp2 = !this.otp2;
      // this.mobileOTPVerify = true;

      this.loaderval = true;
      const rTime = this.customCommonService.timeSpamCalculation();
      const data = {
        id: this.regform.value.mobileotp,
        f_name: this.requestTimeMobile,
        l_name: rTime,
      };

      this.commonService.checkOTPView(data).subscribe(
        (res) => {
          this.loaderval = false;
          if (res.status === 'True') {
            this.otp2 = !this.otp2;
            this.mobileOTPVerify = true;
          }
        },
        (error) => {
          this.loaderval = false;
          if (error === 400) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else if (error === 401) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP_TIME,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else {
            this.customCommonService.errorHandling(error);
          }
        }
      );
    } else {
      this.customCommonService.OpenModal(
        WARNING_HEADER,
        ENTER_OTP,
        WARNING_IMG,
        WARNING_COLOR,
        ''
      );
    }
  }

  sendmobileotp() {
    console.log(this.mobileInputValue);
    this.commonService
      .smsVerificationAtRegistaration(this.mobileInputValue.toString())
      .subscribe(
        (res) => {
          // console.log('data=> ', res);
          if (res.status === EMAIL_STATUS) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              MOBILE_EXISTS,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else {
            this.mobileStatusValue = true;
            this.requestTimeMobile = res.resquest_timestamp;
            this.otp2 = !this.otp2;
            this.sendmobileotpDisable = true;
          }
        },
        (error) => {
          this.customCommonService.errorHandling(error);
        }
      );
  }

  mobileInput(event: any) {
    const inputValue = event.target.value;
    this.mobileInputValue = inputValue;
    // console.log(inputValue);
  }

  dobInput(event: any) {
    const inputValue = event.target.value;
    this.dobVal = inputValue;
    console.log(inputValue);
  }
  mOTP(event: any) {
    const inputValue = event.target.value;
    this.mobileInputOtp = inputValue;
    // console.log(inputValue);
  }

  resetlogin() {
    this.regform.reset({});
    // if(formData.value.length > 0){
    //   // this.userlist.push(formdata.value);

    //   formData.value = '';

    // }
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
}
