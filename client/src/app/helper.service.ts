import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  fileUploadUrl = 'http://localhost:3000/file/upload';
  fetchGraphData = 'http://localhost:3000/graph';

  constructor(public httpClient: HttpClient) { }

  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.httpClient
      .post(this.fileUploadUrl, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }

  getGraphData() {
    return this.httpClient.get(this.fetchGraphData);
  }
}
