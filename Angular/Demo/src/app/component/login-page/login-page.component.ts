import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  ngOnInit() {
    this.cap();
    }

  hide: boolean = true;
capp='';
  constructor(private formBuilder:FormBuilder) {  }

  loginform = this.formBuilder.group({

    emailid:['', [Validators.required, Validators.email]],
    usertype:['', Validators.required],
    password:['', (Validators.required, Validators.minLength(6), Validators.maxLength(30))],
    captinput : ['', Validators.required]

  });

  get g(){
    return this.loginform.controls;
  };

  saveform(){
    console.log('Form data is ', this.loginform.value);
  };

  loginsubmit(){
    
    if (this.loginform.valid) {  
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');  
      console.log(this.loginform.value);  
    }else{
      alert('Please Fill All the Details.');
    }
  };

  cap(){
    
    var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V'
                 ,'W','X','Y','Z','1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i',
                 'j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
                 var a = alpha[Math.floor(Math.random()*62)];
                 var b = alpha[Math.floor(Math.random()*62)];
                 var c = alpha[Math.floor(Math.random()*62)];
                 var d = alpha[Math.floor(Math.random()*62)];
                 var e = alpha[Math.floor(Math.random()*62)];
                 var f = alpha[Math.floor(Math.random()*62)];

                 
                 var final = a+b+c+d+e+f;
                 this.capp = final;
                //  (<HTMLInputElement>document.getElementById("captext")).value = final;
                //  this.captext.values;
                console.log( this.capp)
                  
  };

  // validcap(){
  //   var stg1 = (<HTMLInputElement>document.getElementById("captext")).value;
  //   var stg2 = (<HTMLInputElement>document.getElementById("textinput")).value;;
  //   if(stg1==stg2){
  //     alert("Form is validated Succesfully");
  //     return true;
  //   }else{
  //     alert("Please enter a valid captcha");
  //     return false;
  //   }
  //  }

}
