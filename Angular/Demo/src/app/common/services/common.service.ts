import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmailVerificationAtRegistaration, FileDownload, FileUpload, ReceicerRegistration, SenderKey, SenderRegistration, SmsVerificationAtRegistaration, UserCreate } from '../modal/Registration';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = environment.baseURL;
  progress:number = 1;
  url:string = '';

  constructor(private http: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

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

  createUser(data: any): Observable<UserCreate> {
    
    return this.http.post<UserCreate>(this.baseUrl+ '/user_create/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  senderRegistration(data:any): Observable<SenderRegistration> {
    
    return this.http.post<SenderRegistration>(this.baseUrl+ '/api/SenderRegistration/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  receicerRegistration(data:any): Observable<ReceicerRegistration> {
    
    return this.http.post<ReceicerRegistration>(this.baseUrl+ '/api/ReceicerRegistration/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  senderKey(data:any): Observable<SenderKey> {
    
    return this.http.post<SenderKey>(this.baseUrl+ '/api/SenderKey/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }



  emailVerificationAtRegistaration(emailval:string): Observable<EmailVerificationAtRegistaration> {
    const data = {
        "email": emailval
      }
    return this.http.post<EmailVerificationAtRegistaration>(this.baseUrl+ '/emailVerificationAtRegistaration/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  smsVerificationAtRegistaration(mobileno:string): Observable<SmsVerificationAtRegistaration> {
    const data = {
        "mobile_no": mobileno
      }
    return this.http.post<SmsVerificationAtRegistaration>(this.baseUrl+ '/smsVerificationAtRegistaration/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  fileDownload(emailval:string): Observable<FileDownload> {
    const data = {
        "doc_id": "707792697170",
        "file_name": "abc"
      }
    return this.http.post<FileDownload>(this.baseUrl+ '/file_upload/FileDownloaderView/', data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  fileUpload(filedata:FormData): Observable<any> {
    
    return this.http.post(`${this.baseUrl}/file_upload/FileUploadView/`, filedata,{
      reportProgress: true,
      observe: 'events'
    })
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

  sendMessage(messageContent: any) {
    return this.http.post(this.url,
    JSON.stringify(messageContent),
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' });
  }

}
