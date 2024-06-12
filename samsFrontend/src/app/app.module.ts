import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material';
import { HttpClientModule } from '@angular/common/http';
import { StudentComponent } from './student/student.component';
import { AdmissionHomeComponent } from './admission-home/admission-home.component';
import { ConfirmBoxDialogComponent } from './confirm-box-dialog/confirm-box-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    AdmissionHomeComponent,ConfirmBoxDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
