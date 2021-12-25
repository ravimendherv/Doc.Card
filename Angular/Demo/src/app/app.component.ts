import { HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Subject } from 'rxjs';
import {
  ERROR_HEADER,
  BACKEND_FAILE_0,
  ERROR_IMG,
  ERROR_COLOR,
  BACKEND_FAILE_401,
  BACKEND_FAILE_404,
  BACKEND_FAILE_400,
  BACKEND_FAILE_500,
  SESSION_TIME_OUT,
  WARNING_COLOR,
  WARNING_HEADER,
  WARNING_IMG,
} from './common/constant/constantFile';
import { CommonService } from './common/services/common.service';
import { CustomCommonService } from './common/services/custom-common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = '';
  showValue = false;
  loginVal = '';
  // sessionFlag = false;

  constructor(
    private bnIdle: BnNgIdleService,
    private customCommonService: CustomCommonService,
    private router: Router,
    private commonService: CommonService
  ) {
    // if (!this.sessionFlag) {
      this.bnIdle.startWatching(60).subscribe((res) => {
        console.log('time => ', res);
        // console.log('timenkjnkjn => ', this.sessionFlag);
        // this.sessionFlag = true;
        if (!this.customCommonService.stopSessionExp) {
          this.customCommonService.stopSessionExp = true;
          this.customCommonService.OpenModal(
            WARNING_HEADER,
            SESSION_TIME_OUT,
            WARNING_IMG,
            WARNING_COLOR,
            '/login'
          );
        }
      });
    // }
  }

  ngOnInit() {
    this.loginVal = '';
    this.customCommonService.outTokenFlag = false;
    this.commonService.outSideAuthToken().subscribe(
      (result) => {
        // this.customCommonService.emit('token data', result.token);
        this.customCommonService.tokenval = result.token;
      },
      (error) => {
        this.customCommonService.errorHandling(error);
      }
    );
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
    if (this.customCommonService.showUName) {
      this.showValue = true;
      this.title = this.customCommonService.userName;
    } else {
      this.showValue = false;
    }
  }

  logOut() {
    this.customCommonService.logOut();
  }
}
