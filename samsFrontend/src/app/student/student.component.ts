import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../module/material';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  StudentForm: FormGroup | any;

  baseurl = environment.serverBaseUrl;
  isUpdate: boolean = false;
  isStudent: boolean = false;
  department: any = [];
  batch: any = [];
  course: any = [];
  dept: any;
  Student: any = [];
  data: any = [];

  constructor( public dlgref: MatDialogRef<StudentComponent>,
    @Inject(MAT_DIALOG_DATA) data: any = [], private fb: FormBuilder,public dlg: MatDialog, private http: HttpClient, public router: Router) {
    this.data = data;
    console.log(this.data)
  }

  ngOnInit(): void {
    if (this.data.length > 0) {
      this.getForm()
      this.updateInfo();

    }
    else {
      this.getForm()
      this.getDeptInfo()
      this.getBatchInfo()
      this.getStudentInfo()
    }

  }
  getStudentInfo() {
    return this.http.get(this.baseurl + "/stud/getStudentInfo")
      .subscribe((res: any) => {
        if (res.success) {
          this.Student = res.result;
          if (this.Student.length > 0) {
            this.isStudent = true;
          }
        }
      });
  }
  getForm() {
    this.StudentForm = this.fb.group({
      studId: null,
      name: ['', Validators.required],
      Father_Name: ['', Validators.required],
      department: ['', Validators.required],
      batch: ['', Validators.required],
      cutoff: ['', Validators.required],
      course: ['', Validators.required],
      Mobile: ['', Validators.required],
      isAdmitted: ['', Validators.required]
    });
  }
  getDeptInfo() {
    return this.http.get(this.baseurl + "/stud/getDepartmentInfo")
      .subscribe((res: any) => {
        if (res.success) {
          this.department = res.result;
          console.log(this.department)
        }
      });

  }
  getBatchInfo() {
    return this.http.get(this.baseurl + "/stud/getBatchInfo")
      .subscribe((res: any) => {
        if (res.success) {

          this.batch = res.result
        }
      });

  }

  getCourseInfo(dept: any) {
    const data = {
      "dept": dept
    }
    return this.http.post(this.baseurl + "/stud/getCourseInfo", data)
      .subscribe((res: any) => {
        if (res.success) {
          this.course = res.result;
          console.log(this.course)
        }
      });

  }

  updateInfo() {
    this.isUpdate = true;
    this.StudentForm.setValue({
      studId: this.data[0].studId,
      name: this.data[0].studName,
      Father_Name: this.data[0].fatherName,
      department: this.data[0].deptId,
      batch: this.data[0].batchId,
      cutoff: this.data[0].cutOff,
      course: this.data[0].courseId,
      Mobile: this.data[0].mobile,
      isAdmitted: (this.data[0].admitStatus == "Admitted") ? 1 : 0
    })

  }
  submit() {

    let data = {
      "studId": this.isUpdate ? this.StudentForm.value.studId : "",
      "studentName": this.StudentForm.value.name,
      "fatherName": this.StudentForm.value.Father_Name,
      "batchId": this.StudentForm.value.batch,
      "courseId": this.StudentForm.value.course,
      "departmentId": this.StudentForm.value.department,
      "mobile": this.StudentForm.value.Mobile,
      "cutOff": this.StudentForm.value.cutoff,
      "isAdmitted": this.StudentForm.value.isAdmitted
    }
    console.log(this.StudentForm);

    if (this.isUpdate) {
      this.isUpdate = false;
    }
    return this.http.post(this.baseurl + "/stud/putStudentInfo", data)
      .subscribe((res: any) => {
        if (res.success) {
          this.getForm();
          this.getStudentInfo();
          this.dlgref.close(true);
        }
      });
  }

  onclose()
  {
    this.dlgref.close(false);
  }


}




