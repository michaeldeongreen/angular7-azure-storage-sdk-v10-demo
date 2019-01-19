import { Component } from '@angular/core';
import { BlobStorageService } from './azure-storage/blob-storage.service';
import { from, Observable } from 'rxjs';
import { BlobUploadCommonResponse } from '@azure/storage-blob';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular7-azure-storage-sdk-v10-demo';

  constructor(private blobStorageService: BlobStorageService) {}  

  private _response: BlobUploadCommonResponse;
  public UploadStarted: boolean = false;
  public UploadCompleted: boolean = false;
  public UploadProgress: Observable<number>;

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    this.UploadStarted = true;
    this.UploadProgress = this.blobStorageService.UploadProgress;
    this.uploadFile(file);
  }

  private uploadFile(file: File) {
    this.blobStorageService.uploadBlobToStorage(file).then(response => {
      this._response = response;
      this.UploadCompleted = true;
      this.UploadStarted = false;      
    }).catch(error => {
      this._response = error;
      this.UploadCompleted = true;     
      this.UploadStarted = false;       
    });    
  }  
}
