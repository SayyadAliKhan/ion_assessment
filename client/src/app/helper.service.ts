import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(public httpClient: HttpClient) { }

  postFile(fileToUpload: File) {
    const endpoint = 'http://localhost:3000/file/upload';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    return this.httpClient
      .post(endpoint, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }

  getGraphData() {
    const endpoint = 'http://localhost:3000/graph';
    return this.httpClient.get(endpoint);
  }
}
