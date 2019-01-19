import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BlobStorageService } from './azure-storage/blob-storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [BlobStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }