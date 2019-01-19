import { Injectable } from '@angular/core';
import { 
  AnonymousCredential, 
  BlobURL,
  BlockBlobURL,  
  ContainerURL, 
  ServiceURL, 
  StorageURL, 
  Aborter,
  uploadBrowserDataToBlockBlob,
  BlobUploadCommonResponse,
} from '@azure/storage-blob';
import { TransferProgressEvent } from '@azure/ms-rest-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {
  private _uploadProgressSource = new BehaviorSubject<number>(0);
  public UploadProgress = this._uploadProgressSource.asObservable();

  constructor() { }

  public async uploadBlobToStorage (file: File): Promise<BlobUploadCommonResponse> {
    const anonymousCredential = new AnonymousCredential();
    const pipeline = StorageURL.newPipeline(anonymousCredential);
    const serviceURL = new ServiceURL(
      `BLOB SERVICE SAS URL`,
      pipeline
    );
    const containerName = "files";
    const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    const blobName = `NewFile-sdk10-${new Date().getTime()}`
    const blobUrl = BlobURL.fromContainerURL(containerURL, blobName);
    const blockblobURL = BlockBlobURL.fromBlobURL(blobUrl);
    const options = {blockSize: this.getBlockSize(file), parallelism: 10, progress: (transferProgressEvent: TransferProgressEvent) => {
      this.onProgressChanged(transferProgressEvent, file, this._uploadProgressSource);
    } };
    const blobUploadCommonResponse = await uploadBrowserDataToBlockBlob(Aborter.none, file, blockblobURL,options);

    return blobUploadCommonResponse;
  }

  private getBlockSize(file: File): number {
    const size32Mb = 1024 * 1024 * 32;
    const size4Mb = 1024 * 1024 * 4;
    const size512Kb = 1024 * 512;

    return file.size > size32Mb ? size4Mb : size512Kb;
  }  

  private onProgressChanged(transferProgressEvent: TransferProgressEvent, file: File,
    uploadProgressSource: BehaviorSubject<number>) {
      const percentCompleted: number = Math.round((transferProgressEvent.loadedBytes / file.size) * 100);
      uploadProgressSource.next(percentCompleted);
  }  
}
