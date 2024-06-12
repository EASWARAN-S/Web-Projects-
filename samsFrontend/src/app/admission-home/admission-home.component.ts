import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBoxDialogComponent } from '../confirm-box-dialog/confirm-box-dialog.component';
import { StudentComponent } from '../student/student.component';

@Component({
  selector: 'app-admission-home',
  templateUrl: './admission-home.component.html',
  styleUrls: ['./admission-home.component.css']
})
export class AdmissionHomeComponent implements OnInit {
  baseurl = environment.serverBaseUrl;
  Student: any;
  listData = new MatTableDataSource<any>([]);
  isStudent: boolean = false;
newStud :any= []
  displayedColumns: string[] = ['sNo', 'admnNo', 'studName', 'fatherName', 'deptName', 'courseName', 'mobile','cutOff', 'admitStatus', 'actions'];
  constructor(private http: HttpClient, public router: Router, public dlg: MatDialog,) { }

  ngOnInit(): void {
    this.getStudentInfo()
  }
  getStudentInfo() {
    return this.http.get(this.baseurl + "/stud/getStudentInfo")
      .subscribe((res: any) => {
        if (res.success) {
          this.listData = new MatTableDataSource<any>(res.result);
          this.Student = res.result;
          if (this.Student.length > 0) {
            this.isStudent = true;
          }
        }
      });
  }
  addNew()
  {
    this.dlg.open(ConfirmBoxDialogComponent, {
      data: [{
        msg: "Are you sure want to Add .You cannot update department,batch and course if enter wrongly",
        tittle: "Add records"  
      }]
    }).afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
    this.dlg.open(StudentComponent, {
      data:this.newStud
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.getStudentInfo();
        this.ngOnInit();
      }
    });
  }});
  }
  updateInfo(row:any)
  {
    this.dlg.open(ConfirmBoxDialogComponent, {
      data: [{
        msg: "Are you sure want to Update .You cannot update department,batch and course",
        tittle: "Update records"  
      }]
    }).afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        let index : any =[];
        index.push(row);
        this.dlg.open(StudentComponent, {
          data:index
        }).afterClosed().subscribe((res) => {
                    if (res) {
            this.getStudentInfo()
          }
        });
      }
    });

  }
  deleteInfo(row: any) {
    this.dlg.open(ConfirmBoxDialogComponent, {
      data: [{
        msg: "Are you sure want to delete",
        tittle: "Delete records"  
      }]
    }).afterClosed().subscribe((res) => {
      if (res) {
        let data = {
          "studentId": row.studId
        }
        this.http.post(this.baseurl + "/stud/deleteStudentInfo", data)
          .subscribe((res: any) => {
            if (res.success) {
              this.getStudentInfo()
            }
          });
      }
    })

  }

}
