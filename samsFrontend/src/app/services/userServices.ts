
import { HttpClient, HttpClientModule  } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import {  Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  baseurl = environment.serverBaseUrl;
 

  constructor( private http: HttpClient, public router: Router) {

  }

  getDeptinfo() {
    return this.http.get(this.baseurl + "/stud/getDepartmentInfo")
      .subscribe((res:any) => res.json());
  }
  getTodayAttendance(data: any) {
    return this.http.post(this.baseurl + "/dashboard/getTodayAttendance", data)
      .subscribe((res:any) => res.json());
  }
}