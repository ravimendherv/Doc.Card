import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {
  // addpoupButtonDisable;
  // replacepoupButtonDisable;

  constructor() { }

  ngOnInit(): void {
  }

  onFilechange(event: any) {
    // this.addpoupButtonDisable = false;
    // this.replacepoupButtonDisable = false;
    console.log('onFilechange', event);
  }

}
