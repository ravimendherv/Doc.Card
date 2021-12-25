import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { WARNING_HEADER, FILL_ALL_DETAILS, WARNING_IMG, WARNING_COLOR, ENTER_OTP, MOBILE_UPDATED, SUCCESS_COLOR, SUCCESS_HEADER, SUCCESS_IMG } from 'src/app/common/constant/constantFile';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';

@Component({
  selector: 'app-receive-document',
  templateUrl: './receive-document.component.html',
  styleUrls: ['./receive-document.component.scss']
})
export class ReceiveDocumentComponent implements OnInit {

  carddetails:boolean = true;
  optionsSelect: Array<any> = [];
  optionsSelectReceiver: Array<any> = [];
  showval:string = '';
  showvalN:string = '';
  fileNameList='';
  showOtp:boolean = false;
  senderOtp = '';
  nonSenderID = false;
  getReceiverDocFlag = false;
  carddetailsNoti = true;

  constructor(private formBuilder:FormBuilder, private router: Router, private commonService: CommonService, private customCommonService: CustomCommonService) { }

  ngOnInit() {
    // this.optionsSelect = [
    //   { value: 'Feedback', label: 'Feedback' },
    //   { value: 'Report a bug', label: 'Report a bug' },
    //   { value: 'Feature request', label: 'Feature request' },
    //   { value: 'Other stuff', label: 'Other stuff' },
    //   ];
    this.nonSenderID = this.customCommonService.getReceiverDocFlag;
      if(this.nonSenderID){
        this.getSenderDetails();
        // this.customCommonService.getReceiverDocFlag = false;
      }
  }

  ngDoCheck(){
    if(this.customCommonService.clickreceiveDocFlag){
      this.nonSenderID = false;
      this.carddetails = true;
      this.carddetailsNoti = true;
      // console.log('nnnnnnnnnn')      
    } else {
      this.nonSenderID = this.customCommonService.getReceiverDocFlag;
    }
    
   }

  receivedfile = this.formBuilder.group({

    senderid:['', Validators.required],
    contactFormSubjects: ['', Validators.required],
    otptype:['', Validators.required],
    mobileotp: ['']

  });  

  
  get g(){
    return this.receivedfile.controls;
  };


  filereceived(){
    
    if (this.receivedfile.valid) {  
    
      this.fileNameList = '';
      let tempFilenName = '';
      
      for (let index = 0; index < this.showval.length; index++) {
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
       
        this.senderOtp = res.resquest_timestamp;
        this.showOtp = true;
      }, error =>{
        this.customCommonService.errorHandling(error);
      });

    } else if(this.getReceiverDocFlag) {
      this.fileNameList = '';
      let tempFilenName = '';
      
      for (let index = 0; index < this.showvalN.length; index++) {
        if(this.showvalN.length==1){
          this.fileNameList += this.showvalN[index]      
        }else{
          this.fileNameList += this.showvalN[index]+ ',';
        }
        
      }

      tempFilenName = this.fileNameList;
      if(this.showvalN.length==1){
        this.fileNameList = tempFilenName;
        console.log(this.fileNameList)
      } else {
        this.fileNameList = tempFilenName.slice(0, -1);
        console.log(this.fileNameList)
      }
    
      // this.router.navigate(['/loginFactor']);
      console.log('Selected Files: ', this.showvalN);
      console.log('From filesend(): ',this.receivedfile.value);  
      this.commonService.getDocFromUser(this.customCommonService.getReceiverDocData,this.fileNameList,this.receivedfile.value.otptype).subscribe(res=>{
       
        this.senderOtp = res.resquest_timestamp;
        this.showOtp = true;
      }, error =>{
        this.customCommonService.errorHandling(error);
      });

    } else{
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

  cardrequest() {
    this.customCommonService.getReceiverDocFlag = false;
    this.nonSenderID = this.customCommonService.getReceiverDocFlag;
    this.customCommonService.clickreceiveDocFlag = false;
    this.carddetailsNoti = true;
    if (this.carddetails == true) {
      this.carddetails = false;
      this.optionsSelect = [];
      // this.carddetailsNoti = true;
      this.listTable(this.receivedfile.value.senderid);
    }
    else if (this.carddetails == false) {
      this.carddetails = true;
      // this.carddetailsNoti = true;
    }
    
  };

  listTable(data:string){
    this.optionsSelect = [];    
    this.commonService.sendrFileList(data).subscribe(res=>{
      console.log('data Ta',res)
      this.optionsSelect = res;
    }, error =>{
      this.customCommonService.errorHandling(error);
    })
  }

  listTableReceiver(data:string){
    this.optionsSelectReceiver = [];
    this.commonService.sendrFileList(data).subscribe(res=>{
      console.log('data',res)
      this.optionsSelectReceiver = res;
    }, error =>{
      this.customCommonService.errorHandling(error);
    })
  }

  verifyOtp(){

    const rTime = this.customCommonService.timeSpamCalculation();
      const data = {
        id: this.receivedfile.value.mobileotp,
        f_name: this.senderOtp,
        l_name: rTime,
      };

      let senderId = ''

      this.commonService.checkOTPViewAfterLogin(data).subscribe(
        (res) => {
          if (res.status === 'True') {
            
            if(this.getReceiverDocFlag){
              senderId = this.customCommonService.getReceiverDocData;
            } else {
              senderId = this.receivedfile.value.senderid;
            }

            this.commonService.getsendFileToReceiver(senderId,this.fileNameList).subscribe(res=>{
              this.customCommonService.OpenModal(
                SUCCESS_HEADER,
                res.status,
                SUCCESS_IMG,
                SUCCESS_COLOR,
                ''
              );
              this.customCommonService.notifyCountBol = true;
            }, error =>{
              this.customCommonService.errorHandling(error);
            });

          }
        }, error => {
          this.customCommonService.OpenModal(WARNING_HEADER,ENTER_OTP,WARNING_IMG,WARNING_COLOR,'');
        }
      );




    // if(this.senderOtp == this.receivedfile.value.mobileotp){
      
    // } else {
    //   this.customCommonService.OpenModal(WARNING_HEADER,ENTER_OTP,WARNING_IMG,WARNING_COLOR,'');
    // }
  }

  // getnotifycount() {
  //   this.commonService.receiverNotify().subscribe(r => {
  //     this.notify = r.count;
  //   })
  // }

  getSenderDetails(){
    this.carddetailsNoti = false;
    this.carddetails = true;
    this.getReceiverDocFlag = true;
    this.listTableReceiver(this.customCommonService.getReceiverDocData);
  } 

}
