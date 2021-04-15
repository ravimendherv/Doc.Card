import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/services/common.service';




@Component({
  selector: 'app-doc-transaction',
  templateUrl: './doc-transaction.component.html',
  styleUrls: ['./doc-transaction.component.scss']
})
export class DocTransactionComponent implements OnInit {

  displayedColumns = ['position','name', 'date', 'time', 'action', 'performed'];
  dataSource: any;

  constructor(private commonService: CommonService) { }
  

  ngOnInit(): void {
    if(this.commonService.userId){
      this.listTable(this.commonService.userId);
    }
  }

  listTable(data:string){
    this.commonService.histFileList(data).subscribe(res=>{
      console.log('data',res)
      this.dataSource = res;
    })
  }

  

}

