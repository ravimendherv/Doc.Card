import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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

  ngOnInit(): void {  }

  constructor(private formbuilder:FormBuilder) { }

  regform = this.formbuilder.group({

    firstname:['', Validators.required],
    lastname:['', Validators.required],
    dob:['', Validators.required],
    gender:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    mobile:['', Validators.required],
    type:['', Validators.required],
    password:['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    confirmpassword:['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    emailotp:['', Validators.required],
    mobileotp:['', Validators.required]

  },
  {
    validator: this.MustMatch('password', 'confirmpassword'),
    // validator1: this.otpemail('dumyemailotp', 'emailotp')
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
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');  
      console.table(this.regform.value);  
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

  verifyemail(){
    
  };
  
  verifymobile(){
  
  };

  sendmobileotp(){

    this.otp2 = ! this.otp2;
  };

  sendemailotp(){
    this.otp1 = ! this.otp1;
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