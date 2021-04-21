import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-receiver-dashboard',
  templateUrl: './receiver-dashboard.component.html',
  styleUrls: ['./receiver-dashboard.component.scss']
})
export class ReceiverDashboardComponent implements OnInit {
  isExpanded: boolean = false;
  notify = '';
  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getnotifycount();
  }

  // routLinkFun(linkVal:string){
  //   this.router.navigateByUrl(linkVal); 
  //   this.getnotifycount();
  // }

  // logOut(){
  //   this.commonService.access = '';
  //   this.commonService.refresh = '';
  //   this.commonService.tokenval = '';
  //   this.router.navigateByUrl('/home-page')
  // }

  getnotifycount() {
    this.commonService.receiverNotify().subscribe(r => {
      this.notify = r.count;
    })
  }

}
