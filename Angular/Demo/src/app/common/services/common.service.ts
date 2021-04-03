import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmailVerificationAtRegistaration, FileDownload, ReceicerRegistration, SenderKey, SenderRegistration, SmsVerificationAtRegistaration, UserCreate } from '../modal/Registration';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl = environment.baseURL;

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

  fileUpload(filedata:any): Observable<FileDownload> {
    const data = {
        "doc_id": "687832316147",
        "input_file": filedata,
        "file_name": "Pan"
      }
      const formData: FormData = new FormData();
        formData.append('doc_id', '687832316147');
        formData.append('input_file', filedata);
        formData.append('file_name', 'Pan');
    return this.http.post<FileDownload>(this.baseUrl+ '/file_upload/FileUploadView/', filedata, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // addDocument(user, entydata, filedata, agentVal, implementationTaskIdValue): Observable<AddDocument>{
  //   let docDetails = {
  //     "agent": agentVal,
  //     "entityRequirementIds": entydata,
  //     "implementationTaskId": implementationTaskIdValue,
  //     "size": filedata.size,
  //     "title": filedata.title,
  //     "type": filedata.type,
  //     "useerLogin": user
  //   }

  //   const formData = new FormData();
  //   formData.append("document", this.fileToUpload);
  //   formData.append("documentDetails", JSON.stringify(docDetails));

  //   return this.http.post<AddDocument>(this.url + 'cmarp/api/resolutionpacks/addDocument', formData).pipe(
  //     catchError((err) =>{
  //       this.errorFiltration(err);
  //       return this.handleError(err);
  //     })
  //   );
  // }
}
