import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doc-card',
  templateUrl: './doc-card.component.html',
  styleUrls: ['./doc-card.component.scss']
})
export class DocCardComponent implements OnInit {

  carddetails:boolean = true;
  fCard='';
  bCard='';
  baseUrl = environment.baseURL;
  up:boolean = true;
  down:boolean = false;

  constructor(private formBuilder:FormBuilder, private router: Router,private commonService: CommonService) { }

  ngOnInit(): void {
    this.getCard();
  }

  getCard(){
    this.commonService.docImg().subscribe(x=>{
      this.fCard = this.baseUrl+x.front_side;
      this.bCard = this.baseUrl+x.back_side;
    });

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
      this.up = false;
      this.down = true;
    }
    else if (this.carddetails == false) {
      this.carddetails = true;
      this.up = true;
      this.down = false;
      // this.doccardinfo;
    }
    

  };


}
