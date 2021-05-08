import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, VERSION, } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpEventType, HttpClient, HttpEvent } from '@angular/common/http';
import { Subscription, throwError } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { CustomCommonService } from '../../services/custom-common.service';
import { SUCCESS_HEADER, FILE_NAME_EXIST, SUCCESS_IMG, SUCCESS_COLOR, FILE_SIZE_255, FILE_TYPE_MSG, WARNING_COLOR, WARNING_HEADER, WARNING_IMG } from '../../constant/constantFile';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() onFileEmit: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private formbuilder: FormBuilder, private commonApicallService: CommonService, private customCommonService: CustomCommonService) {
    // this.Choosefile.nativeElement = ""; 
  }

  name = "Angular " + VERSION.major;
  fileTypeVal = '';

  lines: any = [];
  linesR: any = [];
  filedata: any;
  loaderval = false;
  progress: number = 0;
  form = this.formbuilder.group({
    fileName: ['', Validators.required],
    profile: ['']
  });

  ngOnInit() { }

  get g() {
    return this.form.controls;
  };

  
  keyPress(event: any) {
    const pattern = /[A-Za-z0-9_]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  };

  onSubmit() {
    // this.onFileEmit.emit(this.form.value.docId);
    this.loaderval = true;
    if(this.fileTypeVal == 'png'){
        const formData: FormData = new FormData();
        formData.append('doc_id', this.customCommonService.userId);
        formData.append('input_file', this.filedata);
        formData.append('file_name', this.form.value.fileName+'^');

        this.commonApicallService.pngfileUpload(formData).subscribe(x=>{
          this.onFileEmit.emit(this.customCommonService.userId);  
          this.loaderval = false;    
        }, error =>{
        this.customCommonService.OpenModal(WARNING_HEADER,FILE_NAME_EXIST,WARNING_IMG,WARNING_COLOR,'');
          this.loaderval = false;
        });

    } else if(this.fileTypeVal == 'pdf'){
        const formData: FormData = new FormData();
        formData.append('doc_id', this.customCommonService.userId);
        formData.append('input_file', this.filedata);
        formData.append('file_name', this.form.value.fileName);
    
        this.commonApicallService.fileUpload(formData).subscribe(x=>{
          this.onFileEmit.emit(this.customCommonService.userId);   
          this.loaderval = false;   
        }, error =>{
          this.customCommonService.OpenModal(SUCCESS_HEADER,FILE_NAME_EXIST,SUCCESS_IMG,SUCCESS_COLOR,'');

          this.loaderval = false;
        });
    }
    
  
  }

  

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
        this.customCommonService.OpenModal(SUCCESS_HEADER,FILE_SIZE_255,SUCCESS_IMG,SUCCESS_COLOR,'');
      }

      let b = file.type;
      let c = b.split('/');
      console.log("File Type from Main : " + c[1]);
      if (c[1] == 'pdf' || c[1] == 'png') {

        this.fileTypeVal = c[1];
      }
      else {
        event.srcElement.value = null;
        this.customCommonService.OpenModal(SUCCESS_HEADER,FILE_TYPE_MSG,SUCCESS_IMG,SUCCESS_COLOR,'');

      }

    }

  }



}

