import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { NavigationExtras, Router } from '@angular/router';
import { CHOOSE_USERTYPE, CORRECT_USERNAME_PASS, ENTER_CAPTCH, FILL_ALL_DETAILS, WARNING_COLOR, WARNING_HEADER, WARNING_IMG } from 'src/app/common/constant/constantFile';
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
  loaderval = false;

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
    this.loaderval = true;
    this.customCommonService.on('token data').subscribe((res) =>{
      this.tokenval= res;
    })
    console.log(this.tokenval);
    const substring = '@'
    
    if (this.loginform.valid) { 

      if(this.loginform.value.username.indexOf(substring) !== -1){
        this.commonService.email_to_username(this.loginform.value.username).subscribe(res => {
          this.emailUserval = res.username;
          this.passVal = this.loginform.value.password
          if(this.capp == this.loginform.value.captinput){
            this.routeByUserType(this.loginform.value.usertype,this.emailUserval,this.passVal);
            
          } else {
            this.customCommonService.OpenModal(WARNING_HEADER,ENTER_CAPTCH,WARNING_IMG,WARNING_COLOR,'');
            this.loaderval = false;
          }
          
        }, error => {
          this.loaderval = false;
          this.customCommonService.errorHandling(error); 
        }
        );
       


      } else{
        this.userVal = this.loginform.value.username;
        this.passVal = this.loginform.value.password
        if(this.capp == this.loginform.value.captinput){
        this.routeByUserType(this.loginform.value.usertype,this.userVal,this.passVal);
        
        } else {
          this.customCommonService.OpenModal(WARNING_HEADER,ENTER_CAPTCH,WARNING_IMG,WARNING_COLOR,'');
          this.loaderval = false;
        }

        
      }

      console.log(this.loginform.value);  
    }else{
      this.customCommonService.OpenModal(WARNING_HEADER,FILL_ALL_DETAILS,WARNING_IMG,WARNING_COLOR,'');
      this.loaderval = false;
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
    this.customCommonService.userType = val;    
      this.commonService.login(userName, pass).subscribe(res => {
       
        if(val == res.usertype){
          this.customCommonService.access = res.access;
          this.customCommonService.refresh = res.refresh;
          this.customCommonService.userId = res.username;
          this.authOtp =res.resquest_timestamp;
          this.apiUserType = res.usertype;
          this.customCommonService.userEmail = res.email;
          this.customCommonService.userName = res.name;
          this.router.navigate(['/two-factor'], { state: { userType: val , authotp: this.authOtp} });
          this.loaderval = false;
        } else {
          this.customCommonService.OpenModal(WARNING_HEADER,CHOOSE_USERTYPE,WARNING_IMG,WARNING_COLOR,'/login');
          this.loaderval = false;
        }
        
      }, err =>{
        this.customCommonService.OpenModal(WARNING_HEADER,CORRECT_USERNAME_PASS,WARNING_IMG,WARNING_COLOR,'/login');
          this.loaderval = false;
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
