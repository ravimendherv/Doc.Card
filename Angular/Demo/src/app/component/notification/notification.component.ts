import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  // displayedColumns = ['position','senderid','name', 'date', 'time', 'accept', 'deneid'];
  displayedColumns = ['position','name', 'date', 'time', 'from', 'action'];
  dataSource: any;
  

  constructor(private commonService: CommonService) { }

  ngOnInit() {
    if(this.commonService.userId){
      this.listTable();
    }
  }

  listTable(){
    this.commonService.receiverNotifyList().subscribe(res=>{
      console.log('data',res)
      this.dataSource = res;
    })
  }

}
