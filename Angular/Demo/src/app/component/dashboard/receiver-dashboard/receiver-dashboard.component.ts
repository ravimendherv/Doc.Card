import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WARNING_HEADER, SESSION_TIME_OUT, WARNING_IMG, WARNING_COLOR } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';

@Component({
  selector: 'app-receiver-dashboard',
  templateUrl: './receiver-dashboard.component.html',
  styleUrls: ['./receiver-dashboard.component.scss']
})
export class ReceiverDashboardComponent implements OnInit {
  isExpanded: boolean = false;
  notify = '';

  userActivity:any;
  userInactive: Subject<any> = new Subject();

  constructor(private router: Router, private commonService: CommonService, private customCommonService: CustomCommonService) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.customCommonService.OpenModal(WARNING_HEADER,SESSION_TIME_OUT,WARNING_IMG,WARNING_COLOR,'/login'));
   }

   setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 100000);
  }
  
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  ngOnInit(): void {
    this.getnotifycount();
  }

  ngDoCheck() {
    if(this.customCommonService.notifyCountBol == true){
      this.getnotifycount();      
    }
    // this.getnotifycount();
  }

  

  getnotifycount() {
    this.commonService.receiverNotify().subscribe(r => {
      this.notify = r.count;
    }, error =>{
      this.customCommonService.errorHandling(error);
    });
    this.customCommonService.notifyCountBol = false;
  }

}
