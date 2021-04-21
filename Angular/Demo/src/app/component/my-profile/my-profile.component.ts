import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  editgmail:boolean = true;
  savegmail:boolean = true;
  uneditgmail:boolean = true;

  uneditphone:boolean = true;
  savephone:boolean = true;
  editphone:boolean = true;
  gmailotp:boolean = true;

  hideotp:boolean = true;
  flag:boolean = false;
  hidemobotp:boolean = true;
  flag1:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  editemailvalue() {
    if (this.savegmail == true) {
    this.editgmail = false;
    this.savegmail = false;
    
    if (this.flag1 == true) {
      this.hidemobotp = true;
      this.flag1 = false;
    }

    if (this.flag == true) {
      this.hideotp = true;
      this.flag = false;
    }

    }
    else if (this.savegmail == false) {
      this.editgmail = true;
      this.savegmail = true;
      this.gmailotp = true;
      this.uneditgmail = false;


    }
    
    
  }

  saveemailchanges() {
    this.editgmail = true;
    this.uneditgmail = true;
    this.gmailotp = true;
    this.hideotp = false;
    this.flag = true;
    this.flag1 = true;

  }

  editphonevalue() {
    if (this.savephone == true) {
    this.editphone = false;
    this.savephone = false;

    if (this.flag1 == true) {
      this.hideotp = true;
      this.flag1 = false;
    }

    if (this.flag == true) {
      this.hidemobotp = true;
      this.flag1 = false;
    }
    }
    else if (this.savephone == false) {
      this.editphone = true;
      this.savephone = true;
      this.uneditphone = false;

      
    }
    
  }

  savephonechanges() {
    this.editphone = true;
    this.uneditphone = true;
    this.hidemobotp = false;
    this.flag = true;

    this.flag1 = true;
  }

}
