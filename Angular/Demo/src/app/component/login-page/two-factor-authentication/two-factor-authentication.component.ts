import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';


@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.component.html',
  styleUrls: ['./two-factor-authentication.component.scss']
})
export class TwoFactorAuthenticationComponent implements OnInit {
  userTypeVal = '';
  otpVal = ''
  nav:any;
  uEmail:any;
  


  constructor(private router: Router, private formbuilder: FormBuilder, private commonservice: CommonService) {
    this.nav = this.router.getCurrentNavigation();
    this.userTypeVal = this.nav.extras.state.userType;
    this.otpVal = this.nav.extras.state.authotp;
    
  }

  ngOnInit(): void {
    const temp = this.commonservice.userEmail;
    this.uEmail = temp.replace(temp.substr(1,temp.indexOf('@')-1), "********");
  }

  twoauth = this.formbuilder.group({

    otp: ['', Validators.required],

  });

  saveform() {
    console.log('Form data is ', this.twoauth.value);
  };

  get g() {
    return this.twoauth.controls;
  };

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  onSubmit() {
    
    if(this.otpVal == this.twoauth.value.otp){
      this.commonservice.showUName = true;
        if(this.userTypeVal == '0'){  
          this.router.navigate(['/sender_dashboard']);    
        } else if(this.userTypeVal== '1'){          
          this.router.navigate(['/receiver_dashboard']);    
        }

    } else {
      alert('Please ReEnter Otp');
    }

  }

 

}
