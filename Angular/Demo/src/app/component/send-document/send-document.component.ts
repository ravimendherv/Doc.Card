import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';


@Component({
  selector: 'app-send-document',
  templateUrl: './send-document.component.html',
  styleUrls: ['./send-document.component.scss']
})
export class SendDocumentComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private router: Router) { }

  optionsSelect: Array<any> = [];
  showval:string = '';

  sendfile = this.formBuilder.group({

    receiverid:['', Validators.required],
    contactFormSubjects: ['', Validators.required]

  });

  ngOnInit() {
    this.optionsSelect = [
      { value: 'Feedback', label: 'Feedback' },
      { value: 'Report a bug', label: 'Report a bug' },
      { value: 'Feature request', label: 'Feature request' },
      { value: 'Other stuff', label: 'Other stuff' },
      ];
  }

  get g(){
    return this.sendfile.controls;
  };


  filesend(){
    
    if (this.sendfile.valid) {  
    
      // this.router.navigate(['/loginFactor']);
      console.log('Selected Files: ', this.showval);
      console.log('From filesend(): ',this.sendfile.value);  

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


}
