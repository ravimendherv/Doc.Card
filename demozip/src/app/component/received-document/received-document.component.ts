import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { EMAIL_STATUS } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-received-document',
  templateUrl: './received-document.component.html',
  styleUrls: ['./received-document.component.scss']
})
export class ReceivedDocumentComponent implements OnInit {

  carddetails:boolean = true;
  // otp2: boolean = false;
  // mobileOTPVerify= false;
  // sendmobileotpDisable = false;
  // mobileInputValue = 0;
  // mobileOtp = '';
  // mobileInputOtp = '';
  optionsSelect: Array<any> = [];
  showval:string = '';

  constructor(private formBuilder:FormBuilder, private router: Router, private commonService: CommonService) { }

  ngOnInit() {
    this.optionsSelect = [
      { value: 'Feedback', label: 'Feedback' },
      { value: 'Report a bug', label: 'Report a bug' },
      { value: 'Feature request', label: 'Feature request' },
      { value: 'Other stuff', label: 'Other stuff' },
      ];
  }

  

  receivedfile = this.formBuilder.group({

    senderid:['', Validators.required],
    contactFormSubjects: ['', Validators.required],
    otptype:['', Validators.required],
    mobileotp:['', Validators.required]

  });  

  
  get g(){
    return this.receivedfile.controls;
  };


  filereceived(){
    
    if (this.receivedfile.valid) {  
    
      // this.router.navigate(['/loginFactor']);
      console.log('Selected Files: ', this.showval);
      console.log('From filereceived(): ',this.receivedfile.value);  

    }else{
      alert('Please Fill All the Details.');
    };

  };

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  cardrequest() {
    if (this.carddetails == true) {
      this.carddetails = false;
    }
    else if (this.carddetails == false) {
      this.carddetails = true;
    }
    
  };

  //======= mobile Logic ===========

  // resetmobile(){
  //   this.otp2 = ! this.otp2;
  //   this.sendmobileotpDisable = false;
  // }
 
  // verifymobile(){
  //   if(this.mobileInputOtp === this.mobileOtp){
  //     this.otp2 = ! this.otp2;
  //     this.mobileOTPVerify =true;
  //   } else {
  //     alert('Please enter correct OTP');
  //   }
  // };

  // sendmobileotp(){
    

  //   console.log(this.mobileInputValue);
  //   this.commonService.smsVerificationAtRegistaration(this.mobileInputValue.toString()).subscribe(res =>{
  //       // console.log('data=> ', res);
  //       if(res.status === EMAIL_STATUS){
  //         alert('This Mobile no already Exie');
  //       } else {
  //         this.mobileOtp = res.otp;
  //         this.otp2 = ! this.otp2;
  //         this.sendmobileotpDisable = true;
  //       }
  //   });
  // };

  // // mobileInput(event: any ){
  // //   const inputValue = event.target.value;
  // //   this.mobileInputValue = inputValue;
  // //   // console.log(inputValue);
  // // }
  
  // mOTP(event: any ){
  //   const inputValue = event.target.value;
  //   this.mobileInputOtp = inputValue;
  //   // console.log(inputValue);
  // }


}
