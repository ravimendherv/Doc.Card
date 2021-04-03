import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, VERSION } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpEventType, HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

//   @Output() onFileEmit: EventEmitter<any> = new EventEmitter();
//   @Output() uploadProgress: EventEmitter<any> = new EventEmitter();

//   excelFile = '.csv';
//   xmlFile = 'text/xml';
//   filterFile = '';
//   fileUploaded!: File;
//   fileType: any;
//   fileName: string = '';
//   file = {
//     inprogress: false,
//     progress: 0
//   };

//   subscriptions: Subscription = new Subscription;

//   @Input() set filterType(type: any) {
//     this.fileType =type;
//     switch (type) {
//       case 'xl':
//         this.filterFile = this.excelFile;
//         break;
//       case 'xml':
//         this.filterFile = this.xmlFile;
//         break;
//       default:
//         this.filterFile='';
//     }
//   };

//   @Input() isUploadBtn: boolean = false;
//   @Input() uploadUrl: string = '';
//   @Input() overrideClass: string = '';
//   filetyped: any;


  constructor(private http: HttpClient,private formbuilder:FormBuilder, private commonApicallService: CommonService) { }

//   ngOnInit(): void {
//     this.fileName = '';
//   }

//   fileChange(files:any){
//     if(files.length > 0){
//       this.fileUploaded = files.item(0);
//       if(this.fileType && this.validateFile(this.fileType, this.fileUploaded.name) ){
//         this.fileName = '';
//         alert('Invalid File Format Selected');
//         return;
//       }
//       if(this.fileUploaded.size == 0){
//         alert('You cannot upload a blank file. Please select another file and try again');
//         return;
//       }

//       this.fileName = this.fileUploaded.name;
//       console.log('file', this.fileUploaded.name);
//       let typeFile = this.fileUploaded.name.split('.');
//       for (let i = 0; i < typeFile.length; i++) {
//         this.filetyped = typeFile[typeFile.length-1];
//       }
//       console.log('data==========>', this.filetyped);
//       let fileData = {
//         "size": this.fileUploaded.size,
//         "title": this.fileUploaded.name,
//         "type": this.filetyped
//       }
//       // this.commonApicallService.uploadfileData = fileData;
//       // this.commonApicallService.fileToUpload = this.fileUploaded;
//       //uploadfileData

//       console.log('File========>', this.fileUploaded.name.split('.'));
//       this.onFileEmit.emit(this.fileUploaded);
//     }
//     else{
//       this.fileUploaded!;
//       this.fileName = "";
//     }
//   }

//   validateFile(type: string, fileName: string) {
//     let ext: any = fileName.split('.');
//     ext = ext[ext.length - 1];
//     let excel = ['xlsx', 'csv', 'xls'];
//     if (type === 'xl' && excel.includes(ext)) {
//       return false;
//     }
//     else if (type === 'xml' && ext === 'xml') {
//       return false;
//     }
//     return true;
//   }

//   // upload file to the api url.
//   uploadFile() {
//     if (this.fileUploaded && this.fileUploaded.name) {
//       const formData = new FormData();
//       formData.append('file', this.fileUploaded, this.fileUploaded.name);
//       this.file.inprogress = true;
//       // this.subscriptions = this.http.post<any>(this.uploadUrl, formData, {
//       //   reportProgrees: true,
//       //   observe: 'events'
//       // }).pipe(
//       //   map(event => {
//       //     switch (event.type) {
//       //       case HttpEventType.UploadProgress:
//       //         this.file.progress = Math.round(event.loaded * 100 / event.total);
//       //         this.uploadProgress.emit(this.file.progress);
//       //         break;
//       //       case HttpEventType.Response:
//       //         return event;
//       //     }
//       //   })).subscribe((event:any) =>{
//       //     if (typeof (event) === 'object') {
//       //       this.file.inprogress = false;
//       //       console.log(`${this.fileUploaded.name} file uploaded successfully`);
//       //       alert(`${this.fileUploaded.name} file uploaded successfully`);
//       //     }
//       //   }, (error: any) => {
//       //     this.file.inprogress = false;
//       //     console.log(`${this.fileUploaded.name} file upload failed`);
//       //     alert(`${this.fileUploaded.name} file upload failed`);
//       //   });
        
//     }
//   }

//   ngOnDestroy() {
//     this.fileName = '';
//   }


// }


name = "Angular " + VERSION.major;
    
      lines: any = [];
      linesR: any = [];
      filedata: any;
      // form: FormGroup | undefined;
      form: FormGroup = this.formbuilder.group({
        profile: ['']
      });

      ngOnInit() {
        // form = this.formbuilder.group({
        //   profile: ['']
        // });
      }

      onSubmit(){
        const formData: FormData = new FormData();
        formData.append('doc_id', '687832316147');
        formData.append('input_file', this.filedata);
        formData.append('file_name', 'Pan');

        this.commonApicallService.fileUpload(formData).subscribe(res=>{
          console.log('res',res);
        })
      }
    
      onChange(event:any) {

        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.filedata = file;
          // this.form.get('profile').setValue(file);
          console.log(this.form);
        }
        // let fileList = (<HTMLInputElement>files.target).files;
        
        // if (fileList && fileList.length > 0) {
        //   let file: File = fileList[0];
        //   console.log(file.name);
        //   console.log(file.size);
        //   console.log(file.type);
        //   this.filedata = fileList;
    
        //   let reader: FileReader = new FileReader();
        //   reader.readAsText(file);
        //   reader.onload = e => {
        //     let csv: any = reader.result;
        //     let allTextLines = [];
        //     allTextLines = csv.split(/\r|\n|\r/);
    
        //     let headers = allTextLines[0].split(";");
        //     let data = headers;
        //     let tarr = [];
        //     for (let j = 0; j < headers.length; j++) {
        //       tarr.push(data[j]);
        //     }
        //     this.lines.push(tarr);
        //     let tarrR = [];
        //     let arrl = allTextLines.length;
        //     let rows = [];
        //     for (let i = 1; i < arrl; i++) {
        //       rows.push(allTextLines[i].split(";"));
        //     }
        //     for (let j = 0; j < arrl; j++) {
        //       tarrR.push(rows[j]);
        //     }
        //     this.linesR.push(tarrR);
        //   };
        // }
      }
    }