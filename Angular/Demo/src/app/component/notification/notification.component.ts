import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  

  constructor(private commonService: CommonService, private customCommonService: CustomCommonService, private router: Router) { 
    console.log('dat=====Cons');
  }

  ngOnInit() {
    if(this.customCommonService.userId){
      this.listTable();
    }
    console.log('dat===In');
  }

  ngDoCheck(){
   if(this.customCommonService.calNotificationListFlag){
    this.listTable();
   }
  }

 
  listTable(){
    this.commonService.receiverNotifyList().subscribe(res=>{
      // console.log('data',res)
      this.dataSource = res;
    }, error =>{
      this.customCommonService.errorHandling(error);
    });
    this.customCommonService.calNotificationListFlag = false;
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

  getReceiverDoc(data: any) {
    console.log('call==> ', data);
    this.customCommonService.getReceiverDocFlag = true;
    this.customCommonService.getReceiverDocData = data.from;
    this.customCommonService.clickreceiveDocFlag = false;
    this.router.navigateByUrl('/receiver_dashboard/receivedoc');    
    this.linkDelete(data.from,data.name);
  }

  linkDelete(senderId: string,fileName:string){
    // const senderId = fileName;
    this.commonService.linkDelete(senderId,fileName).subscribe(res=>{
      this.customCommonService.notifyCountBol = true;
      this.listTable();

    }, error =>{
      this.customCommonService.errorHandling(error);
    });
  }

}
