import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonDataService } from 'src/app/common/service/common-data.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  options: string[] =[];
  constructor(public formBuilder: FormBuilder,private commonDataService: CommonDataService) { }
  ngOnInit() {
    this.countryCode();
  }
  
  // selectedQuantity = "10";

  form = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    countrycode: new FormControl(''),
    

  });

  
  get f(){
    return this.form.controls;
  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  } 

  countryCode(){
    this.commonDataService.getCountryCode().subscribe(data=>{
      data.forEach((e: any) => {
        this.options.push(e.dial_code);
      });
    
    });
  }

  submit(){
    console.log(this.form.value);
    if (this.form.valid) {  
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');  
      console.table(this.form.value);  
    }else{
      alert('please select all values');
    }
  }
  
}
