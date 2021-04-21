import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'app-receive-document',
  templateUrl: './receive-document.component.html',
  styleUrls: ['./receive-document.component.scss']
})
export class ReceiveDocumentComponent implements OnInit {

  carddetails:boolean = true;
  optionsSelect: Array<any> = [];
  showval:string = '';
  fileNameList='';


  constructor(private formBuilder:FormBuilder, private router: Router, private commonService: CommonService) { }

  ngOnInit() {
    // this.optionsSelect = [
    //   { value: 'Feedback', label: 'Feedback' },
    //   { value: 'Report a bug', label: 'Report a bug' },
    //   { value: 'Feature request', label: 'Feature request' },
    //   { value: 'Other stuff', label: 'Other stuff' },
    //   ];

      
  }

  receivedfile = this.formBuilder.group({

    senderid:['', Validators.required],
    contactFormSubjects: ['', Validators.required],
    otptype:['', Validators.required]

  });  

  
  get g(){
    return this.receivedfile.controls;
  };


  filereceived(){
    
    if (this.receivedfile.valid) {  
    
      // this.router.navigate(['/loginFactor']);
      // console.log('Selected Files: ', this.showval);
      // console.log('From filereceived(): ',this.receivedfile.value);  
      // this.commonService.getDocFromUser(this.receivedfile.value.senderid,).subscribe(res=>{

      // })

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
      console.log('From filesend(): ',this.receivedfile.value);  
      this.commonService.getDocFromUser(this.receivedfile.value.senderid,this.fileNameList,this.receivedfile.value.otptype).subscribe(res=>{
        // alert(res.status);
        console.log(res)
      });

    }else{
      alert('Please Fill All the Details.');
    };

  };

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  cardrequest() {
    if (this.carddetails == true) {
      this.carddetails = false;
      this.listTable(this.receivedfile.value.senderid);
    }
    else if (this.carddetails == false) {
      this.carddetails = true;
    }
    
  };

  listTable(data:string){
    this.commonService.sendrFileList(data).subscribe(res=>{
      console.log('data',res)
      this.optionsSelect = res;
    })
  }


}
