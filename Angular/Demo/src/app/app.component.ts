import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ERROR_HEADER, BACKEND_FAILE_0, ERROR_IMG, ERROR_COLOR, BACKEND_FAILE_401, BACKEND_FAILE_404, BACKEND_FAILE_400, BACKEND_FAILE_500 } from './common/constant/constantFile';
import { CommonService } from './common/services/common.service';
import { CustomCommonService } from './common/services/custom-common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  showValue = false;
  loginVal = '';
  

constructor(private customCommonService: CustomCommonService,private router: Router, private commonService: CommonService) {
  
}


ngOnInit() {
  
  this.loginVal = ''
  this.commonService.outSideAuthToken().subscribe(result =>{
    // this.customCommonService.emit('token data', result.token);
    this.customCommonService.tokenval = result.token;
  }, error => {
    this.customCommonService.errorHandling(error);      
  });
  this.router.navigate(['']);
  
  }

  // ngOnChanges() {
  //   if(this.commonService.userName != undefined){
  //     this.showValue = true;
  //     this.title = this.commonService.userName;
  //   } else {
  //     this.showValue = false;
  //   }
  // }


  ngDoCheck() {
    if(this.customCommonService.showUName){
      this.showValue = true;
      this.title = this.customCommonService.userName;
    } else {
      this.showValue = false;      
    }

  }


  logOut(){
    this.customCommonService.access = '';
    this.customCommonService.refresh = '';
    this.customCommonService.tokenval = '';
    this.customCommonService.showUName = '';
    // this.router.navigateByUrl('/home-page')
  }

}
