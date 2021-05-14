import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { WARNING_HEADER, FILL_ALL_DETAILS, WARNING_IMG, WARNING_COLOR, RECEVER_ID_INCORRECT } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';


@Component({
  selector: 'app-send-document',
  templateUrl: './send-document.component.html',
  styleUrls: ['./send-document.component.scss']
})
export class SendDocumentComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private router: Router, private commonService: CommonService, private customCommonService: CustomCommonService) { }

  optionsSelect: Array<any> = [];
  showval:string = '';
  fileNameList = '';

  sendfile = this.formBuilder.group({

    receiverid:['', Validators.required],
    contactFormSubjects: ['', Validators.required]

  });

  ngOnInit() {
    // this.optionsSelect = [
    //   { value: 'Feedback', label: 'Feedback' },
    //   { value: 'Report a bug', label: 'Report a bug' },
    //   { value: 'Feature request', label: 'Feature request' },
    //   { value: 'Other stuff', label: 'Other stuff' },
    //   ];

      this.listTable(this.customCommonService.userId);
  }

  listTable(data:string){
    this.commonService.uploadeFileList(data).subscribe(res=>{
      console.log('data',res)
      this.optionsSelect = res;
    }, error =>{
      this.customCommonService.errorHandling(error);
    })
  }

  get g(){
    return this.sendfile.controls;
  };


  filesend(){
    
    if (this.sendfile.valid) {  
      this.fileNameList = '';
      let tempFilenName = '';
      
      for (let index = 0; index < this.showval.length; index++) {
        // console.log('data',this.showval.length);
        if(this.showval.length==1){
          this.fileNameList += this.showval[index]      
        }else{
          this.fileNameList += this.showval[index]+ ',';
        }
        
      }

      tempFilenName = this.fileNameList;
      if(this.showval.length==1){
        this.fileNameList = tempFilenName;
        console.log(this.fileNameList)
      } else {
        this.fileNameList = tempFilenName.slice(0, -1);
        console.log(this.fileNameList)
      }
    
      // this.router.navigate(['/loginFactor']);
      console.log('Selected Files: ', this.showval);
      console.log('From filesend(): ',this.sendfile.value);  
      this.commonService.sendFileToReceiver(this.sendfile.value.receiverid,this.fileNameList).subscribe(res=>{
        
      }, error =>{
        this.customCommonService.OpenModal(WARNING_HEADER,RECEVER_ID_INCORRECT,WARNING_IMG,WARNING_COLOR,'');
        this.customCommonService.errorHandling(error);
      }
      );

    }else{
      this.customCommonService.OpenModal(WARNING_HEADER,FILL_ALL_DETAILS,WARNING_IMG,WARNING_COLOR,'');
    };

  };

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  };


}
