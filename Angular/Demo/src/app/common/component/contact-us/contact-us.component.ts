import { Component, OnInit, HostListener  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SUCCESS_HEADER, SEND_SUCCESSFUL, SUCCESS_IMG, SUCCESS_COLOR } from '../../constant/constantFile';
import { CommonService } from '../../services/common.service';
import { CustomCommonService } from '../../services/custom-common.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

contactForm: FormGroup;
disabledSubmitButton: boolean = true;
optionsSelect: Array<any> = [];

@HostListener('input') oninput() {

  if (this.contactForm.valid) {
    this.disabledSubmitButton = false;
  }
}

constructor(fb: FormBuilder, private commonservice: CommonService, private router: Router, private customCommonService: CustomCommonService) {

  this.contactForm = fb.group({
    'contactFormName': ['', Validators.required],
    'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
    'contactFormSubjects': ['', Validators.required],
    'contactFormMessage': ['', Validators.required]
    });
  }

  ngOnInit() {


  this.optionsSelect = [
    { value: 'Feedback', label: 'Feedback' },
    { value: 'Report a bug', label: 'Report a bug' },
    { value: 'Feature request', label: 'Feature request' },
    { value: 'Other stuff', label: 'Other stuff' },
    ];
  }

  get g(){
    return this.contactForm.controls;
  };


  onSubmit() {

    if(this.contactForm.valid){
      const data = {
        "name": this.contactForm.value.contactFormName,
        "comment": this.contactForm.value.contactFormMessage,
        "subject": this.contactForm.value.contactFormSubjects,
        "email_id": this.contactForm.value.contactFormEmail
      }

      this.commonservice.contactUs(data).subscribe(res=>{
          console.log(res)
          this.customCommonService.OpenModal(SUCCESS_HEADER,SEND_SUCCESSFUL,SUCCESS_IMG,SUCCESS_COLOR,'/');
      });

    }
    
    

    
  }

  // constructor() { }

  // ngOnInit(): void {
  // }

  // resetcontact(formData:any) {
  //   if(formData.value.length > 0){
  //     // this.userlist.push(formdata.value);
  //     formData.value = '';
      
  //   }
  // }


}
