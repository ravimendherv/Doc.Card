import { Component } from '@angular/core';
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
constructor(private customCommonService: CustomCommonService, private commonService: CommonService) {}

ngOnInit() {
  
  this.loginVal = ''
  this.commonService.outSideAuthToken().subscribe(result =>{
    // this.customCommonService.emit('token data', result.token);
    this.commonService.tokenval = result.token;
  })
  
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
    if(this.commonService.showUName){
      this.showValue = true;
      this.title = this.commonService.userName;
    } else {
      this.showValue = false;      
    }
  }

  logOut(){
    this.commonService.access = '';
    this.commonService.refresh = '';
    this.commonService.tokenval = '';
    this.showValue = false;
    // this.router.navigateByUrl('/home-page')
  }

  // ngAfterContentInit() {
  //   console.log("ngAfterContentInit");
  // }

  // ngAfterContentChecked() {
  //   console.log("ngAfterContentChecked");
  // }

  // ngAfterViewInit() {
  //   console.log("ngAfterViewInit");
  // }

  // ngAfterViewChecked() {
  //   console.log("ngAfterViewChecked");
  // }

  // ngOnDestroy() {
  //   console.log("ngOnDestroy");
  // }


}
