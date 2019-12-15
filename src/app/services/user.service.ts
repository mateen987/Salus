import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 

@Injectable({
  providedIn: 'root'
})

export class UserService {
   baseUrl = 'http://localhost:8000/api/auth/';
  constructor(private http:HttpClient) { }
  auth(obj){
  return this.http.post(this.baseUrl+'login',obj,{
    headers: new HttpHeaders({
         'Content-Type':  'application/json',
       })
  }).pipe(map(res => res))



  }
  }

