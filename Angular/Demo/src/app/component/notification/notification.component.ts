import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  // displayedColumns = ['position','senderid','name', 'date', 'time', 'accept', 'deneid'];
  displayedColumns = ['position','name', 'date', 'time', 'from', 'action'];
  dataSource: any;
  

  constructor(private commonService: CommonService, private customCommonService: CustomCommonService) { }

  ngOnInit() {
    if(this.customCommonService.userId){
      this.listTable();
    }
  }

  listTable(){
    this.commonService.receiverNotifyList().subscribe(res=>{
      // console.log('data',res)
      this.dataSource = res;
    }, error =>{
      this.customCommonService.errorHandling(error);
    })
  }

  downloadFile(path: string, fileName:string){
    window.open(environment.baseURL+path);
    const senderId = fileName.split("_", 1).toString();
    setTimeout(() => { 
      //  console.log("World!"); 
      this.commonService.zipfileDelete(senderId,fileName).subscribe(res=>{
        this.customCommonService.notifyCountBol = true;
        this.listTable();
        
      }, error =>{
        this.customCommonService.errorHandling(error);
      });
      }, 10000);
  }

  rejectFile(fileName:string){
    const senderId = fileName.split("_", 1).toString();
    this.commonService.zipfileDelete(senderId,fileName).subscribe(res=>{
      this.customCommonService.notifyCountBol = true;
      this.listTable();

    }, error =>{
      this.customCommonService.errorHandling(error);
    });
  }

}
