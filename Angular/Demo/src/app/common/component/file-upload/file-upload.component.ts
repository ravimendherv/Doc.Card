import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, VERSION, } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpClient, HttpEvent } from '@angular/common/http';
import { Subscription, throwError } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() onFileEmit: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private commonApicallService: CommonService) {
    // this.Choosefile.nativeElement = ""; 
  }

  name = "Angular " + VERSION.major;

  lines: any = [];
  linesR: any = [];
  filedata: any;
  progress: number = 0;
  form = this.formbuilder.group({
    fileName: ['', Validators.required],
    profile: ['']
  });

  ngOnInit() { }

  get g() {
    return this.form.controls;
  };

  onSubmit() {
    // this.onFileEmit.emit(this.form.value.docId);
    const formData: FormData = new FormData();
    formData.append('doc_id', this.commonApicallService.userId);
    formData.append('input_file', this.filedata);
    formData.append('file_name', this.form.value.fileName);

    this.commonApicallService.fileUpload(formData).subscribe(x=>{
      this.onFileEmit.emit(this.commonApicallService.userId);      
    })
    // .pipe(
    //   map((event: any) => {
    //     if (event.type == HttpEventType.UploadProgress) {
    //       this.progress = Math.round(event.loaded / event.total * 100);
    //     } else if (event.type == HttpEventType.Response) {
    //       this.progress = 0;
    //       this.onFileEmit.emit(this.commonApicallService.userId);
    //     }
    //   }),
    //   catchError((err: any) => {
    //     this.progress = 0;
    //     alert(err.message);
    //     return throwError(err.message);
    //   })
    // )
    //   .toPromise();


  }

  //  --------------File Type And Size Validation -------------------

  // filetSize(sizeval:Number){
  //   if(sizeval > 261120){
  //     alert("File size should be max 255 kb.");
  //     console.log("File Size:"+sizeval);

  //   }
  //   console.log(sizeval);
  //   // maxbytes 255 kb = 261120 bytes

  // }

  // fileType(typeval:string){
  //   let exttype = typeval.split('/');

  //   if(exttype[1] == 'pdf' || exttype[1] == 'png'){
  //     console.log("File Type: "+exttype[1]);
  //   }
  //   else{
  //     alert("File Type should be .pdf or .png");
  //   }

  // }

  onChange(event: any) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.filedata = file;
      // this.form.get('profile').setValue(file);
      console.log(this.form);
      // this.filetSize(file.size);
      let a = file.size;
      console.log("File Size from Main : " + a);
      if (a > 261120) {
        // this.Ch.nativeElement.value = "";
        event.srcElement.value = null;


        alert("File size should be max 255 kb.");


        // file.value = null;
        // file = '';
      }

      let b = file.type;
      let c = b.split('/');
      console.log("File Type from Main : " + c[1]);
      if (c[1] == 'pdf' || c[1] == 'png') {

        // alert("Match");

      }
      else {
        event.srcElement.value = null;


        alert("File Type should be .pdf or .png");

      }

      // this.fileType(file.type);
      // this.onFileEmit.emit(this.form.value.docId);
    }

  }



}

