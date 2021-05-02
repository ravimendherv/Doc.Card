import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';




@Component({
  selector: 'app-doc-transaction',
  templateUrl: './doc-transaction.component.html',
  styleUrls: ['./doc-transaction.component.scss']
})
export class DocTransactionComponent implements OnInit {

  displayedColumns = ['position','name', 'date', 'time', 'action', 'performed'];
  dataSource: any;

  constructor(private commonService: CommonService,private customCommonService: CustomCommonService) { }
  

  ngOnInit(): void {
    if(this.customCommonService.userId){
      this.listTable(this.customCommonService.userId);
    }
  }

  listTable(data:string){
    this.commonService.histFileList(data).subscribe(res=>{
      console.log('data',res)
      this.dataSource = res;
    }, error =>{
      this.customCommonService.errorHandling(error);
    });
  }

  

}

