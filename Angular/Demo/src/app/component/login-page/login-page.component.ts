import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { NavigationExtras, Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // evenBusssubscription: any;
  outsidetokenvalue:string = '';
  emailUserval: string = '';
  passVal: string = '';
  userVal: string = '';
  authOtp='';
  apiUserType ='';

  ngOnInit() {
    this.cap();
    }

    tokenval:any;

  hide: boolean = true;
  capp='';
  

  constructor(private formBuilder:FormBuilder, private router: Router, private customCommonService: CustomCommonService, private commonService: CommonService) {  }

  loginform = this.formBuilder.group({

    username:['', Validators.required],
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

    this.customCommonService.on('token data').subscribe((res) =>{
      this.tokenval= res;
    })
    console.log(this.tokenval);
    const substring = '@'
    
    if (this.loginform.valid) { 

      if(this.loginform.value.username.indexOf(substring) !== -1){
        // alert('Email')
        this.commonService.email_to_username(this.loginform.value.username).subscribe(res => {
          this.emailUserval = res.username;
          this.passVal = this.loginform.value.password
          this.routeByUserType(this.loginform.value.usertype,this.emailUserval,this.passVal);
        })
       


      } else{
        // alert('Id')
        this.userVal = this.loginform.value.username;
        this.passVal = this.loginform.value.password
        this.routeByUserType(this.loginform.value.usertype,this.userVal,this.passVal);

        
      }

      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');  
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

  routeByUserType(val:string, userName:string, pass:string){
    this.commonService.userType = val;    
      this.commonService.login(userName, pass).subscribe(res => {
       
        if(val == res.usertype){
          this.commonService.access = res.access;
          this.commonService.refresh = res.refresh;
          this.commonService.userId = res.username;
          this.authOtp =res.otp;
          this.apiUserType = res.usertype;
          this.commonService.userEmail = res.email;
          this.commonService.userName = res.name;
          this.router.navigate(['/two-factor'], { state: { userType: val , authotp: this.authOtp} });
        } else {
          alert('Please choose correct userType');
          this.router.navigateByUrl('/login');
        }
        
      }, err =>{
        alert('Enter correct username and password');
          this.router.navigateByUrl('/login');
      });
      
  }

  resetlogin() {
    this.loginform.reset({});
    // if(formData.value.length > 0){
    //   // this.userlist.push(formdata.value);
      
    //   formData.value = '';
      
    // }
  }

  ngOnDestroy() {
    this.resetlogin();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
  
}
