import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators"; 
import{Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

   baseUrl = 'https://dev-api.saluslifestyles.com/api/auth/';
   adminbaseUrl='https://dev-api.saluslifestyles.com/api/';
   admindeleteData='https://dev-api.saluslifestyles.com/api/foods/';  
   adminexercise='https://dev-api.saluslifestyles.com/api/exercises/';

 
     pageData =new Subject<any>();
     data$=this.pageData.asObservable();
userdata:any;
calendarData:any;
Name:any;
   constructor(private http:HttpClient) { }
   sendData(data){
   this.userdata=data;
   console.log("service",data)
   }
   getuserData(){
     console.log("service",this.userdata)
  return this.userdata
   }
   CalendarInfo(info){
    this.calendarData=info;
   }
   getcalendarData(){
    //  console.log("calendar data",this.calendarData)
     return this.calendarData;
   }

   sendName(data){
    this.Name=data;
    }
    getName(){
   return this.Name
    }


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
deleteExercise(id){
  return this.http.delete(this.adminexercise+id,{
  }).pipe(map(res=>res))
}

updateExercise(info){
  console.log("ok",info);
return this.http.put(this.admindeleteData+info.id,info,{
}).pipe(map(res=>res))
}
getSearchExercise(id){
  return this.http.get(this.adminbaseUrl+'badges',id)
}

getCategory(){
  return this.http.get(this.adminbaseUrl+'categories')
}
findCategory(id){
  return this.http.get(this.adminbaseUrl+'categories/'+id)
}
getUsers(){
return this.http.get(this.adminbaseUrl+'users?page=2')
}
 
uploadchallenges(data){
  return this.http.post(this.adminbaseUrl+'challenges',data,{
    

  }).pipe(map(res=>res))
}


// user api section start here 

adduserexercise(data){
return this.http.post(this.adminbaseUrl+'exerciseLogs',data,{
}).pipe(map(res=>res))
}

getUserExerciseTable(data){
  return this.http.post(this.adminbaseUrl+'exerciseLogs/userLogs',data,{

  }).pipe(map(res=>res))
}
deleteexercise(id){
  return this.http.delete(this.adminbaseUrl+'exerciseLogs/'+id,{

  }).pipe(map(res=>res))
}

usermeals(data){
  return this.http.post(this.adminbaseUrl+'meals/userMeals',data,{

  }).pipe(map(res=>res))
}
FavouriteMeal(data){
    return this.http.post(this.adminbaseUrl+'foods/userFavorites?page=1',data,{
    }).pipe(map(res=>res))
}
// admin crud table data
getchallenges(){
  return this.http.get(this.adminbaseUrl+'challenges')
}
totalBadges(){
  return this.http.get(this.adminbaseUrl+'badges')
}
findChallenge(id){
  return this.http.get(this.adminbaseUrl+'challenges/'+id )
}
deleteChallenge(id){
  return this.http.delete(this.adminbaseUrl+'challenges/'+id,{
  }).pipe(map(res=>res))
}
deleteBadge(id){
  return this.http.delete(this.adminbaseUrl+'badges/'+id,{
  }).pipe(map(res=>res))
}
searchfood(name){
  return this.http.get(this.adminbaseUrl+'foods?search='+name,{
  }).pipe(map(res=>res))
}
userFavouriteMeals(userId){
    console.log("id ye hai",userId)
  return this.http.post(this.adminbaseUrl+'favoriteFoodLogs/userFavorites',userId,{
  }).pipe(map(res=>res))
}
// favouriteFood(data){
//   return this.http.post(this.adminbaseUrl+'favoriteFoodLogs',data,{

//   }).pipe(map(res=>res))
// }

dashboardData(id){
  return this.http.get(this.adminbaseUrl+'users/'+id+'/dashboard')
}

dailytasks(id){
  return this.http.get(this.adminbaseUrl+'dailyTasks/'+id)
}
dailytaskpost(data){
  return this.http.post(this.adminbaseUrl+'dailyTasks',data,{

  }).pipe(map(res=>res))
}


foodName(){
return this.http.get(this.adminbaseUrl+'foods?page=1');

}

addNutritionFood(data){
  return this.http.post(this.adminbaseUrl+'nutritionalLogs',data,{
  }).pipe(map(res=>res))
}
removeNutritionFood(data){
  return this.http.delete(this.adminbaseUrl+'meals/'+data,{
  }).pipe(map(res=>res))
}

joinChallenge(data){
  return this.http.post(this.adminbaseUrl+'challengeLogs/userEntries',data,{

  }).pipe(map(res=>res))
}

joinSelectedChallenge(data){
  return this.http.post(this.adminbaseUrl+'challengeLogs',data,{
  }).pipe(map(res=>res))
}

mealsForNutrition(){
   return this.http.get(this.adminbaseUrl+'meals');
}

addMeal(data){
  return this.http.post(this.adminbaseUrl+'meals',data,{
  }).pipe(res=>res);

}

userPoint(id){
  return this.http.get(this.adminbaseUrl+'users/'+id+'/points')
}
favouriteFood(data){
  return this.http.post(this.adminbaseUrl+'favoriteFoodLogs',data,{

  }).pipe(map(res=>res))
}

trackPoint(data){
  return this.http.post(this.adminbaseUrl+'trackedPoints',data,{

  }).pipe(map(res=>res))
}







}


  

