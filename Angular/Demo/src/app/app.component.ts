import { Component } from '@angular/core';
import { CommonService } from './common/services/common.service';
import { CustomCommonService } from './common/services/custom-common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Demo';
constructor(private customCommonService: CustomCommonService, private commonService: CommonService) {}

ngOnInit() {
  this.commonService.outSideAuthToken().subscribe(result =>{
    // this.customCommonService.emit('token data', result.token);
    this.commonService.tokenval = result.token;
  })
  
  }


}
