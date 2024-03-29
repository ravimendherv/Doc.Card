import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
// import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {
  displayedColumns = ['position', 'name', 'action'];
  dataSource: any;

  constructor(private commonService: CommonService,private customCommonService: CustomCommonService) { }

  ngOnInit(): void {
    // const docId = '687832316147'
    if(this.customCommonService.userId){
      this.listTable(this.customCommonService.userId);
    }
    
  }


  onFilechange(event: any) {
    console.log('onFilechange', event);
    this.listTable(event);
  }

  listTable(data:string){
    this.commonService.uploadeFileList(data).subscribe(res=>{
      console.log('data',res)
      this.dataSource = res;
    }, error =>{
      this.customCommonService.errorHandling(error);
    })
  }

  deleteFile(data:string){
    console.log('file', data)
    const filedata = {
      "doc_id": this.customCommonService.userId,
      "file_name": data
    }
    this.commonService.filedelete(filedata).subscribe(x=>{
      console.log('file delete: ', data)
      this.listTable(this.customCommonService.userId);
    }, error =>{
      this.customCommonService.errorHandling(error);
    })
  }

}
