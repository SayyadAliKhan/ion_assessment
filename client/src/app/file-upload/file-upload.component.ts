import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelperService } from '../helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [HelperService]
})
export class FileUploadComponent implements OnInit {
  fileToUpload: File = null;
  error = false;
  message = '';
  uploadProgress = 0;
  fileUploaded = false;

  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
    private fileUploadService: HelperService,
    private router: Router
    ) {}

  ngOnInit() {
  }

  onFileChange(files: FileList) {
    this.error = false;
    this.uploadProgress = 0;
    if (this.fileValidation(files)) {
      this.fileToUpload = files.item(0);
    }
  }

  uploadFileToActivity() {
    this.error = false;
    this.uploadProgress = 0;
    this.fileUploadService.postFile(this.fileToUpload).subscribe(event => {
          if (event['status'] === 200) {
            this.message = 'File uploaded successfully...Redirecting to the graph page';
            this.fileUploaded = true;
            setTimeout(() => {
              this.fileUploaded = false;
              this.error = false;
              this.router.navigate(['/graph']);
            }, 2000);
          } else if (event.type === HttpEventType.UploadProgress) {
                this.uploadProgress = Math.round(100 * event.loaded / event.total);
            }
        }, error => {
          this.error = true;
          this.message = 'Something went wrong';
          this.timeoutError();
        });
    }

    fileValidation(files) {
      if (files.length === 0) {
        this.error = true;
        this.message = 'Please choose a json file';
        this.timeoutError();
        return false;
      }
      if (files.length > 1) {
        this.error = true;
        this.message = 'Cannot upload multiple files';
        this.timeoutError();
        return false;
      }

      const inputFile = this.fileInput.nativeElement.value.toLowerCase();

      if (!inputFile.match(/(\.json)$/)) {
        this.error = true;
        this.message = 'Please choose a json file';
        this.timeoutError();
        return false;
      }
      return true;
    }

  timeoutError() {
      setTimeout(() => {
        this.error = false;
      }, 2000);
    }
}
