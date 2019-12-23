import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 



@Injectable({
  providedIn: 'root'
})

export class UserService {
   baseUrl = 'http://f22d4ed5.ngrok.io/api/auth/';
   adminbaseUrl='http://f22d4ed5.ngrok.io/api/';
   admindeleteData='http://f22d4ed5.ngrok.io/api/foods/';

  constructor(private http:HttpClient) { }
  token= localStorage.getItem('token');
  auth(obj){
  return this.http.post(this.baseUrl+'login',obj,{
    headers: new HttpHeaders({
         'Content-Type':  'application/json',
         'No-Auth' : 'True',
       })
  }).pipe(map(res => res))

  }


postbadge(data){
  // var apiheader=new Headers();
  // console.log('mateen '+ data.value)
  return this.http.post(this.adminbaseUrl+'badges',data,{

  }).pipe(map(res => res))

  }
  points(){
    return this.http.get(this.adminbaseUrl+'points')
  }
getcompany(){
 return this.http.get(this.adminbaseUrl+'groups')
 }
addexercise(exercises){
  return this.http.post(this.adminbaseUrl+'exercises',exercises,{
  }).pipe(map(res=>res))
}
addFoodNutrition(foods){
return this.http.post(this.adminbaseUrl+'foods',foods,{
  
}).pipe(map(res => res))
}
  
getnutrition(){
 return this.http.get(this.adminbaseUrl+'foods')
}
deletenutrition(id){
  console.log("id is"+id)
  return this.http.delete(this.admindeleteData+id,{

  }).pipe(map(res=> res))
}


updateNutrition(data){
  console.log("ok",data);
return this.http.put(this.admindeleteData+data.id,data,{
}).pipe(map(res=>res))
}

getexercise(){
   return this.http.get(this.adminbaseUrl+'exercises')
}

}


  

