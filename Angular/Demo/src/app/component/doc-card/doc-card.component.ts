import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.scss']
})
export class DocCardComponent implements OnInit {

  carddetails:boolean = true;

  constructor(private formBuilder:FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  doccardinfo = this.formBuilder.group({

    senderaddress:['', Validators.required],
    price : ['100.00 Rs']

  });

  get g(){
    return this.doccardinfo.controls;
  };

  buyrequest(){
    
    if (this.doccardinfo.valid) {  
      
      console.log('After Buy Action : ',this.doccardinfo.value);  
    }else{
      alert('Please Fill All the Details.');
    }
  };

  cardrequest() {
    if (this.carddetails == true) {
      this.carddetails = false;
    }
    else if (this.carddetails == false) {
      this.carddetails = true;
      // this.doccardinfo;
    }
    

  };


}
