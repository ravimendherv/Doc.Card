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

  constructor() { }

  ngOnInit(): void {
  }

  editemailvalue() {
    if (this.savegmail == true) {
    this.editgmail = false;
    this.savegmail = false;
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
  }

  editphonevalue() {
    if (this.savephone == true) {
    this.editphone = false;
    this.savephone = false;
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
  }

}
