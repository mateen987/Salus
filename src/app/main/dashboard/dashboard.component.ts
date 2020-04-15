import { Component, OnInit } from '@angular/core';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  progress = 500;
  user_id:any;
  userData:any;
  goalCalories=2440;
  dailyPoints=6;
  totalMinutes:any;
  Calories:any;
  caloriesBurned:any;
  weekdays:any;
  leaderBoard:any;
  values:any;
  badges:any;
  userPoints:any;
  point=0;
  totalExercise =30;
  constructor(private service:UserService,private router: Router,private Renderer:Renderer2) {
   
    

   }

  progressBar = document.querySelector('.progress-bar');
  // intervalId;

  ngOnInit() {
    this.user_id = localStorage.getItem('userid');
    this.getPoint();
    this.getuserdata();
   
  }

 getPoint(){

   this.service.userPoint(this.user_id).subscribe(res=>{
     this.userPoints=res;
     this.userPoints=this.userPoints.month;
     localStorage.setItem('userPoints',this.userPoints);
     console.log(this.userPoints)

   })
 }

 Nutrition(){
   this.router.navigate(["/nutrition"])
 }
 Exercise(){
  this.router.navigate(["/exercise"])
 }
 dailyTask(){
  this.router.navigate(["/daily-task"])
 }

getuserdata(){
   this.service.dashboardData(this.user_id).subscribe(res=>{
      this.userData=res;
       console.log(this.userData)
      this.Calories=this.userData.today.Calories;
      this.totalMinutes = this.userData.today.totalMinutesExercised;
      
      this.totalExercise =  this.totalExercise - this.totalMinutes;
      console.log(this.totalMinutes);
     
      this.goalCalories = this.goalCalories - this.Calories
      this.caloriesBurned=this.userData.today.totalCaloriesBurned
      // this.caloriesBurned=this.caloriesBurned.toFixed(2);
      console.log(this.caloriesBurned)
      // this.point=1;
      if(this.userData.today.dailyTasks['wellBeing']  != null ){
        this.point++
        console.log(this.point)
      }
      if(this.userData.today.dailyTasks['nutrition'] !=null){
        this.point++
      }
      if(this.userData.today.dailyTasks['hydrate'] !=null){
        this.point++
      }
      if(this.userData.today.dailyTasks['exercise'] !=null){
        this.point++
      }
      if(this.userData.today.dailyTasks['sleep'] !=null){
        this.point++
      }
      if(this.userData.today.dailyTasks['reflect'] !=null){
        this.point++
      
      }
      // if (this.point <= 99) {
     
      //   this.point = this.point * 17;
      // } 
      console.log("points are",this.point)
      this.dailyPoints=this.dailyPoints-this.point
 
  this.weekdays=this.userData.currentWeek;
   this.leaderBoard=this.userData.leaderboard;
  this.badges=this.userData.badges;
   console.log("ok",this.weekdays);
   })
}
percentage(value){

  this.values=value.calorieIntake/value.goalCalories*100;
  if(this.values > 90){
    console.log("value is",this.values);
    return 'progress-bar progress-bar-red'
  }
   else return 'progress-bar progress-bar-nutrition'
}

percentages(value){

  this.values=value.calorieIntake/value.goalCalories*100;
   this.values.toFixed(2)
 return this.values+"%";
}
calculation(value){
  this.values=value.calorieIntake/value.goalCalories*100;
   this.values.toFixed(2)
 return this.values;
}

}
