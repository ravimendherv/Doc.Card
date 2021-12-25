import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SESSION_TIME_OUT } from '../../constant/constantFile';
import { CustomCommonService } from '../../services/custom-common.service';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss'],
})
export class PopupModalComponent implements OnInit {
  header = '';
  msgBody = '';
  alertType = '';
  alertcolor = '';
  routlink = '';

  constructor(
    private router: Router,
    private customCommonService: CustomCommonService,
    private _mdr: MatDialogRef<PopupModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.header = data.header;
    this.msgBody = data.msgBody;
    this.alertType = data.alertType;
    this.alertcolor = data.alertcolor;
    this.routlink = data.routlink;
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  CloseDialog() {
    if (this.msgBody === SESSION_TIME_OUT) {
      this.customCommonService.access = '';
      this.customCommonService.refresh = '';
      this.customCommonService.tokenval = '';
      this.customCommonService.showUName = '';
      this.customCommonService.stopSessionExp = true;
      this._mdr.close(false);
      if (this.routlink !== '') {
        this.router.navigateByUrl(this.routlink);
      }
    } else {
      this._mdr.close(false);
      if (this.routlink !== '') {
        this.router.navigateByUrl(this.routlink);
      }
    }
  }
}
