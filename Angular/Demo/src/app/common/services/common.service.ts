import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CardImg, EmailToUsername, EmailVerificationAtRegistaration, FileDownload, FileToReceiver, FileUpload, GetDocFromUser, HistFileList, Login, NotifyCount, NotifyList, outSideAuthToken, ReceicerRegistration, SenderKey, SenderRegistration, SmsVerificationAtRegistaration, UserCreate } from '../modal/Registration';
import { CustomCommonService } from './custom-common.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = environment.baseURL;
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



  constructor(private http: HttpClient, private customCommonService: CustomCommonService) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  // this.customCommonService;

  // outsidehttpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type':  'application/json',

  //   })
  // };

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


  //Outside method


  createUser(data: any): Observable<UserCreate> {
    const outsidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Token "+ this.tokenval
      })
    };
    
    return this.http.post<UserCreate>(this.baseUrl+ '/user_create/', data, outsidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  outSideAuthToken(): Observable<outSideAuthToken> {
    const data ={
      "username":"royalvision",
      "password":"RoYaLViSiOn2000"
    }

    // this.httpOptions =  new HttpHeaders().set("Authorization", "Bearer " + t);

    
    return this.http.post<outSideAuthToken>(this.baseUrl+ '/auth/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  email_to_username(emailid:any): Observable<EmailToUsername> {

    const data={
      "email": emailid
    }
     
    const outsidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Token "+ this.tokenval
      })
    };

    return this.http.post<EmailToUsername>(this.baseUrl+ '/email_to_username/', data, outsidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  

  senderRegistration(data:any): Observable<SenderRegistration> {
    const outsidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Token "+ this.tokenval
      })
    };
    return this.http.post<SenderRegistration>(this.baseUrl+ '/api/SenderRegistrationProcessViews/', data, outsidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  receicerRegistration(data:any): Observable<ReceicerRegistration> {
    const outsidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Token "+ this.tokenval
      })
    };
    
    return this.http.post<ReceicerRegistration>(this.baseUrl+ '/api/ReceicerRegistrationProcessViews/', data, outsidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  senderKey(data:any): Observable<SenderKey> {
    const outsidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Token "+ this.tokenval
      })
    };
    return this.http.post<SenderKey>(this.baseUrl+ '/api/SenderKeyRegistrationProcessViews/', data, outsidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  emailVerificationAtRegistaration(emailval:string): Observable<EmailVerificationAtRegistaration> {
    const data = {
        "email": emailval
      }

      const outsidehttpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization": "Token "+ this.tokenval
        })
      };
    return this.http.post<EmailVerificationAtRegistaration>(this.baseUrl+ '/emailVerificationAtRegistaration/', data, outsidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  smsVerificationAtRegistaration(mobileno:string): Observable<SmsVerificationAtRegistaration> {
    const data = {
        "mobile_no": mobileno
      }
      const outsidehttpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "Authorization": "Token "+ this.tokenval
        })
      };
    return this.http.post<SmsVerificationAtRegistaration>(this.baseUrl+ '/smsVerificationAtRegistaration/', data, outsidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Inside method

  login(userval:string, passVal: string): Observable<Login> {
    const data = {
      "username": userval,
      "password": passVal
      }
    return this.http.post<Login>(this.baseUrl+ '/token/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  fileDownload(emailval:string): Observable<FileDownload> {
    const data = {
        "doc_id": this.userId,
        "file_name": "abc"
      }
    return this.http.post<FileDownload>(this.baseUrl+ '/file_upload/FileDownloaderView/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  uploadeFileList(docId:string): Observable<any> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    return this.http.get(this.baseUrl+ '/getData/?username='+ this.userId, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendrFileList(docId:string): Observable<any> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    return this.http.get(this.baseUrl+ '/getData/?username='+ docId, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  docImg(): Observable<CardImg> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    const data = {
      "doc_id":this.userId
    } 

    return this.http.post<CardImg>(this.baseUrl+ '/getcard/', data, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  receiverNotify(): Observable<NotifyCount> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    const data = {
      "doc_id":this.userId
    } 

    return this.http.post<NotifyCount>(this.baseUrl+ '/getNotificationCount/', data, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendFileToReceiver(receiverId:string, fileName:string): Observable<FileToReceiver> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    const data = {
      "doc_id": this.userId,
      "receiver_doc_id": receiverId,
      "file_name": fileName
    } 

    return this.http.post<FileToReceiver>(this.baseUrl+ '/file_upload/FileDownloaderView/', data, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  receiverNotifyList(): Observable<NotifyList> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    const data = {
      "username":this.userId
    } 

    return this.http.post<NotifyList>(this.baseUrl+ '/api/getNotificationList/', data, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  histFileList(docId:string): Observable<HistFileList> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    const data = {
      "username":this.userId
    } 

    return this.http.post<HistFileList>(this.baseUrl+ '/api/getHistoryList/', data, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDocFromUser(senderid:string,fileNameList:string,otptype:string): Observable<GetDocFromUser> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    const data = {
      "doc_id": senderid,
      "f_name": fileNameList,
      "gender": otptype
    } 

    return this.http.post<GetDocFromUser>(this.baseUrl+ '/receiveDocumentsendotp/', data, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  filedelete(data:any): Observable<any> {
    const insidesidehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        "Authorization": "Bearer "+ this.access
      })
    };
    
    return this.http.post<any>(this.baseUrl+ '/file_upload/FileDeleterView/', data, insidesidehttpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  fileUpload(filedata:FormData): Observable<any> {
   
    let params = new HttpParams();

    const options = {
      headers: new HttpHeaders().set('Authorization', "Bearer "+this.access),
      params: params,
      reportProgress: true,
      withCredentials: true,
    };
    
    return this.http.post(`${this.baseUrl}/file_upload/FileUploadView/`, filedata, options)
      // .pipe(
      //   // catchError(this.handleError)
      //   map((event: any) => {
      //     if (event.type == HttpEventType.UploadProgress) {
      //       this.progress = Math.round((100 / event.total) * event.loaded);
      //     } else if (event.type == HttpEventType.Response) {
      //       this.progress = 0;
      //     }
      //   }
      // ));
  }

  pngfileUpload(filedata:FormData): Observable<any> {
   
    let params = new HttpParams();

    const options = {
      headers: new HttpHeaders().set('Authorization', "Bearer "+this.access),
      params: params,
      reportProgress: true,
      withCredentials: true,
    };
    
    return this.http.post(`${this.baseUrl}/file_upload/ImageFileUploardView/`, filedata, options)
      // .pipe(
      //   // catchError(this.handleError)
      //   map((event: any) => {
      //     if (event.type == HttpEventType.UploadProgress) {
      //       this.progress = Math.round((100 / event.total) * event.loaded);
      //     } else if (event.type == HttpEventType.Response) {
      //       this.progress = 0;
      //     }
      //   }
      // ));
  }


  // fileUpload(filedata:FormData): Observable<any> {
    
  //   return this.http.post(`${this.baseUrl}/file_upload/FileUploadView/`, filedata,{
  //     reportProgress: true,
  //     observe: 'events'
  //   })
  //     // .pipe(
  //     //   // catchError(this.handleError)
  //     //   map((event: any) => {
  //     //     if (event.type == HttpEventType.UploadProgress) {
  //     //       this.progress = Math.round((100 / event.total) * event.loaded);
  //     //     } else if (event.type == HttpEventType.Response) {
  //     //       this.progress = 0;
  //     //     }
  //     //   }
  //     // ));
  // }

  sendMessage(messageContent: any) {
    return this.http.post(this.url,
    JSON.stringify(messageContent),
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

}
