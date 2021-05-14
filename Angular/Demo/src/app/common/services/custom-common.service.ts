import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { PopupModalComponent } from '../component/popup-modal/popup-modal.component';
import { ERROR_HEADER, BACKEND_FAILE_0, ERROR_IMG, ERROR_COLOR, BACKEND_FAILE_404, BACKEND_FAILE_400, BACKEND_FAILE_500, BACKEND_FAILE_401 } from '../constant/constantFile';

@Injectable({
  providedIn: 'root'
})
export class CustomCommonService {

  progress:number = 1;
  url:string = '';
  tokenval:any;
  access:any;
  refresh:any;
  userId:any;
  userType ='';
  userEmail:any;
  userName:any;
  showUName:any;
  notifyCountBol:any;
  showError:any;
  errorCode:any;

  
  // Error modal
  matDialogRef: MatDialogRef<PopupModalComponent> | undefined;
  name: string = "";

  private _eventBus: Subject<EventModal>;

  constructor(private matDialog: MatDialog) { 
    this._eventBus = new Subject<EventModal>();
  }

  OpenModal(headerVal: string,msgVal: string,alertypeVal: string,alertcolorVal: string, routlink:string) {
    this.matDialogRef = this.matDialog.open(PopupModalComponent, {
      data: { 
        header: headerVal,
        msgBody: msgVal,
        alertType: alertypeVal,
        alertcolor: alertcolorVal,
        routlink: routlink
      },
      disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

  errorHandling(errorCode: number){
    
    switch (errorCode) {
      case 0:
        this.OpenModal(ERROR_HEADER,BACKEND_FAILE_0,ERROR_IMG,ERROR_COLOR,'');
      break;
      case 404:
        this.OpenModal(ERROR_HEADER,BACKEND_FAILE_404,ERROR_IMG,ERROR_COLOR,'/');
      break;
      case 400:
        this.OpenModal(ERROR_HEADER,BACKEND_FAILE_400,ERROR_IMG,ERROR_COLOR,'/login');
      break;
      case 500:
        this.OpenModal(ERROR_HEADER,BACKEND_FAILE_500,ERROR_IMG,ERROR_COLOR,'');
      break;
      case 401:
        this.OpenModal(ERROR_HEADER,BACKEND_FAILE_401,ERROR_IMG,ERROR_COLOR,'/login');
      break;
    
      default:
        break;
    }
  }

  emit(key:string, data?:any){
    this._eventBus.next({key, data});
  }

  on<T>(key:any):Observable<T> {
    return this._eventBus.pipe(
      filter(event => event.key === key),
      map((event) => event.data)
    )
  }
}

interface EventModal {
  key: string;
  data?:any;
}