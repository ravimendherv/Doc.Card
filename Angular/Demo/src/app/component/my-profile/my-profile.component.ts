import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  BACKEND_FAILE_0,
  BACKEND_FAILE_401,
  DELETE_ACCOUNT_MSG,
  EMAIL_EXISTS,
  EMAIL_STATUS,
  EMAIL_UPDATED,
  ENTER_OTP,
  ENTER_OTP_TIME,
  ERROR_COLOR,
  ERROR_HEADER,
  ERROR_IMG,
  MOBILE_EXISTS,
  MOBILE_STATUS,
  MOBILE_UPDATED,
  SUCCESS_COLOR,
  SUCCESS_HEADER,
  SUCCESS_IMG,
  WARNING_COLOR,
  WARNING_HEADER,
  WARNING_IMG,
} from 'src/app/common/constant/constantFile';
import { GetUserProfile } from 'src/app/common/modal/Registration';
import { CommonService } from 'src/app/common/services/common.service';
import { CustomCommonService } from 'src/app/common/services/custom-common.service';
import { DeletePopupModalComponent } from './delete-popup-modal/delete-popup-modal.component';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  editgmail: boolean = true;
  savegmail: boolean = true;
  uneditgmail: boolean = true;
  secondClick: boolean = true;
  emailOTPVerify: boolean = false;

  emailInputValue = '';
  emailInputFlag = false;

  emailStatusValue = false;
  requestTimeEmail = '';
  mobileStatusValue = false;
  requestTimeMobile = '';

  uneditphone: boolean = true;
  savephone: boolean = true;
  editphone: boolean = true;
  mobilesecondClick: boolean = true;
  mobileOTPVerify: boolean = false;
  mobileOtp = '';
  mobileInputValue = '';
  mobileInputFlag = false;

  hideotp: boolean = true;
  flag: boolean = false;
  hidemobotp: boolean = true;
  flag1: boolean = false;
  loaderval = false;
  disableVal = true;

  headerText = 'Delete Account';
  matDialogRef: MatDialogRef<DeletePopupModalComponent> | undefined;
  name: string = '';
  deleteOtp: any;

  // myProfile: FormGroup | undefined;
  profileData: any;
  // profileData = {
  //   id:'41',
  //   username: '4215335778884',
  //   first_name: 'Raj',
  //   last_name: 'Me',
  //   email: 'abc@gmail.com',
  //   moblie_no: '84213579963',
  //   date_of_brith: '2000-5-3',
  //   user_type: 'sender'
  // };

  constructor(
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private customCommonService: CustomCommonService,
    private matDialog: MatDialog
  ) {}

  myProfile = this.formBuilder.group({
    username: [''],
    first_name: [''],
    last_name: [''],
    email: [''],
    emailotp: [''],
    mobotp: [''],
    moblie_no: [''],
    date_of_brith: [''],
    user_type: [''],
  });

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.loaderval = true;
    this.commonService.getUserProfileData().subscribe(
      (res) => {
        if (res) {
          this.profileData = res;
          this.loaderval = false;
        }
      },
      (error) => {
        this.loaderval = false;
        this.customCommonService.errorHandling(error);
      }
    );
  }

  //Email methods

  emailInput(event: any) {
    const inputValue = event.target.value;
    this.emailInputFlag = true;
    this.emailInputValue = inputValue;
    console.log(inputValue);
  }

  editemailvalue() {
    if (this.savegmail == true) {
      this.editgmail = false;
      this.savegmail = false;
      this.uneditgmail = false;
      this.secondClick = false;

      if (this.flag1 == true) {
        this.hidemobotp = true;
        this.flag1 = false;
      }

      if (this.flag == true) {
        this.hideotp = true;
        this.flag = false;
      }
    } else if (this.savegmail == false) {
      this.editgmail = true;
      this.savegmail = true;
      this.uneditgmail = false;
    }
  }

  saveemailchanges() {
    if (this.secondClick == false) {
      if (!this.emailInputFlag) {
        this.emailInputValue = this.profileData.email;
      }
      this.commonService
        .emailVerificationAtRegistaration(this.emailInputValue)
        .subscribe(
          (res) => {
            if (res.status === EMAIL_STATUS) {
              this.customCommonService.OpenModal(
                WARNING_HEADER,
                EMAIL_EXISTS,
                WARNING_IMG,
                WARNING_COLOR,
                ''
              );
              this.secondClick = false;
            } else {
              this.emailStatusValue = true;
              this.requestTimeEmail = res.resquest_timestamp;
              this.editgmail = true;
              this.uneditgmail = false;
              this.savegmail = false;

              this.hideotp = false;
              this.flag = true;
              this.flag1 = true;
              this.secondClick = true;
            }
          },
          (error) => {
            this.customCommonService.errorHandling(error);
          }
        );

      // console.log(this.myProfile.value.email)
      // this.editgmail = true;
      // this.uneditgmail = false;
      // this.savegmail = false;

      // this.hideotp = false;
      // this.flag = true;
      // this.flag1 = true;
    }
  }

  emailVerify() {
    if (this.emailStatusValue) {
      this.loaderval = true;
      const rTime = this.customCommonService.timeSpamCalculation();
      const data = {
        id: this.myProfile.value.emailotp,
        f_name: this.requestTimeEmail,
        l_name: rTime,
      };

      this.commonService.checkOTPViewAfterLogin(data).subscribe(
        (res) => {
          this.loaderval = false;
          if (res.status === 'True') {
            if (this.profileData.user_type === 'Receiver') {
              const data = {
                email_id: this.emailInputValue,
              };
              this.commonService
                .receiverPartillyUpdate(this.profileData.id, data)
                .subscribe(
                  (res) => {
                    this.customCommonService.OpenModal(
                      SUCCESS_HEADER,
                      EMAIL_UPDATED,
                      SUCCESS_IMG,
                      SUCCESS_COLOR,
                      ''
                    );
                    this.getProfile();
                  },
                  (error) => {
                    this.customCommonService.errorHandling(error);
                  }
                );
            } else if (this.profileData.user_type === 'Sender') {
              const data = {
                email_id: this.emailInputValue,
              };
              this.commonService
                .senderPartillyUpdate(this.profileData.id, data)
                .subscribe(
                  (res) => {
                    this.customCommonService.OpenModal(
                      SUCCESS_HEADER,
                      EMAIL_UPDATED,
                      SUCCESS_IMG,
                      SUCCESS_COLOR,
                      ''
                    );
                    this.getProfile();
                  },
                  (error) => {
                    this.customCommonService.errorHandling(error);
                  }
                );
              this.emailupdateApi(this.emailInputValue, this.profileData.id);
            }

            this.emailOTPVerify = true;
            this.savegmail = true;
            this.uneditgmail = false;
            this.hideotp = true;
            this.flag = false;
            this.myProfile.controls['emailotp'].setValue('');
          }
        },
        (error) => {
          this.loaderval = false;
          if (error === 400) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else if (error === 401) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP_TIME,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else {
            this.customCommonService.errorHandling(error);
          }

          // this.customCommonService.errorHandling(error);
        }
      );
    } else {
      this.customCommonService.OpenModal(
        WARNING_HEADER,
        ENTER_OTP,
        WARNING_IMG,
        WARNING_COLOR,
        ''
      );
    }
  }

  emailReset() {
    this.hideotp = true;
    this.flag = false;
    this.uneditgmail = true;
    this.savegmail = true;
    this.myProfile.controls['emailotp'].setValue('');
  }

  emailupdateApi(email: string, id: string) {
    const data = {
      email: this.emailInputValue,
    };
    this.commonService.resetPass(data, id).subscribe(
      (res) => {},
      (error) => {
        this.customCommonService.errorHandling(error);
      }
    );
  }

  ///Mobile methods

  mobileInput(event: any) {
    const inputValue = event.target.value;
    this.mobileInputFlag = true;
    this.mobileInputValue = inputValue;
    console.log(inputValue);
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  editphonevalue() {
    if (this.savephone == true) {
      this.editphone = false;
      this.savephone = false;
      this.uneditphone = false;
      this.mobilesecondClick = false;

      if (this.flag1 == true) {
        this.hideotp = true;
        this.flag1 = false;
      }

      if (this.flag == true) {
        this.hidemobotp = true;
        this.flag1 = false;
      }
    } else if (this.savephone == false) {
      this.editphone = true;
      this.savephone = true;
      this.uneditphone = false;
    }
  }

  savephonechanges() {
    if (this.mobilesecondClick == false) {
      if (!this.mobileInputFlag) {
        this.mobileInputValue = this.profileData.moblie_no;
      }

      this.commonService
        .smsVerificationAtRegistaration(this.mobileInputValue.toString())
        .subscribe(
          (res) => {
            // console.log('data=> ', res);
            if (res.status === EMAIL_STATUS) {
              this.customCommonService.OpenModal(
                WARNING_HEADER,
                MOBILE_EXISTS,
                WARNING_IMG,
                WARNING_COLOR,
                ''
              );
              this.mobilesecondClick = false;
            } else {
              // this.mobileOtp = res.status;
              this.mobileStatusValue = true;
              this.requestTimeMobile = res.resquest_timestamp;
              this.editphone = true;
              this.uneditphone = false;
              this.savephone = false;

              this.hidemobotp = false;
              this.flag = true;
              this.flag1 = true;
              this.mobilesecondClick = true;
            }
          },
          (error) => {
            this.customCommonService.errorHandling(error);
          }
        );

      // console.log(this.myProfile.value.moblie_no)
      // this.editphone = true;
      // this.uneditphone = false;
      // this.savephone = false;

      // this.hidemobotp = false;
      // this.flag = true;
      // this.flag1 = true;
    }
  }

  mobileVerify() {
    // this.myProfile.value.mobotp
    if (this.mobileStatusValue) {
      // ==============
      this.loaderval = true;
      const rTime = this.customCommonService.timeSpamCalculation();
      const data = {
        id: this.myProfile.value.mobotp,
        f_name: this.requestTimeMobile,
        l_name: rTime,
      };

      this.commonService.checkOTPViewAfterLogin(data).subscribe(
        (res) => {
          this.loaderval = false;
          if (res.status === 'True') {
            if (this.profileData.user_type === 'Receiver') {
              const data = {
                mobile_no: this.mobileInputValue,
              };
              this.commonService
                .receiverPartillyUpdate(this.profileData.id, data)
                .subscribe(
                  (res) => {
                    this.customCommonService.OpenModal(
                      SUCCESS_HEADER,
                      MOBILE_UPDATED,
                      SUCCESS_IMG,
                      SUCCESS_COLOR,
                      ''
                    );
                    this.getProfile();
                  },
                  (error) => {
                    this.customCommonService.errorHandling(error);
                  }
                );
            } else if (this.profileData.user_type === 'Sender') {
              const data = {
                mobile_no: this.mobileInputValue,
              };
              this.commonService
                .senderPartillyUpdate(this.profileData.id, data)
                .subscribe(
                  (res) => {
                    this.customCommonService.OpenModal(
                      SUCCESS_HEADER,
                      MOBILE_UPDATED,
                      SUCCESS_IMG,
                      SUCCESS_COLOR,
                      ''
                    );
                    this.getProfile();
                  },
                  (error) => {
                    this.customCommonService.errorHandling(error);
                  }
                );
            }

            this.mobileOTPVerify = true;
            this.savephone = true;
            this.uneditphone = false;
            this.hidemobotp = true;
            this.flag1 = false;
            this.myProfile.controls['mobotp'].setValue('');
          }
        },
        (error) => {
          this.loaderval = false;
          if (error === 400) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else if (error === 401) {
            this.customCommonService.OpenModal(
              WARNING_HEADER,
              ENTER_OTP_TIME,
              WARNING_IMG,
              WARNING_COLOR,
              ''
            );
          } else {
            this.customCommonService.errorHandling(error);
          }
        }
      );

      // ==========
    } else {
      this.customCommonService.OpenModal(
        WARNING_HEADER,
        ENTER_OTP,
        WARNING_IMG,
        WARNING_COLOR,
        ''
      );
    }
  }

  mobileReset() {
    this.hidemobotp = true;
    this.flag1 = false;
    this.uneditphone = true;
    this.savephone = true;
    this.myProfile.controls['mobotp'].setValue('');
  }

  // Delete Modal

  clickDelete() {
    if (!this.emailInputFlag) {
      this.emailInputValue = this.profileData.email;
    }
    const data = {
      name: this.customCommonService.userName,
      email_id: this.emailInputValue,
      subject: DELETE_ACCOUNT_MSG,
    };
    this.commonService.getOtpDelete(data).subscribe(
      (res) => {
        if (res.resquest_timestamp) {
          this.deleteOtp = res.resquest_timestamp;
          this.OpenModal(
            this.headerText,
            ERROR_IMG,
            ERROR_COLOR,
            res.resquest_timestamp,
            this.emailInputValue,
            this.profileData.username,
            this.customCommonService.userName
          );
        } else {
          this.customCommonService.OpenModal(
            WARNING_HEADER,
            res.status,
            WARNING_IMG,
            WARNING_COLOR,
            ''
          );
        }
      },
      (error) => {
        this.customCommonService.errorHandling(error);
      }
    );
  }

  OpenModal(
    headerVal: string,
    alertypeVal: string,
    alertcolorVal: string,
    otpdataVal: string,
    emailVal: string,
    userIdVal: string,
    nameVal: string
  ) {
    this.matDialogRef = this.matDialog.open(DeletePopupModalComponent, {
      data: {
        header: headerVal,
        alertType: alertypeVal,
        alertcolor: alertcolorVal,
        otpdata: otpdataVal,
        email: emailVal,
        name: nameVal,
        userId: userIdVal,
      },
      disableClose: true,
    });

    this.matDialogRef.afterClosed().subscribe((res) => {
      if (res == true) {
        this.name = '';
      }
    });
  }
}
