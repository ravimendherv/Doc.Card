import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { WARNING_HEADER, SESSION_TIME_OUT, WARNING_IMG, WARNING_COLOR } from 'src/app/common/constant/constantFile';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';

@Component({
  selector: 'app-sender-dashboard',
  templateUrl: './sender-dashboard.component.html',
  styleUrls: ['./sender-dashboard.component.scss']
})
export class SenderDashboardComponent implements OnInit {

  userActivity:any;
  userInactive: Subject<any> = new Subject();
  isExpanded: boolean = false;

  constructor(private customCommonService: CustomCommonService, private router: Router) { 
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
  }

  

}
