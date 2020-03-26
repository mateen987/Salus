import { Component, OnInit } from '@angular/core';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  progress = 500;
  user_id:any;
  userData:any;
  Calories:any;
  caloriesBurned:any;
  weekdays:any;
  leaderBoard:any;
  badges:any;
  userPoints:any;
  point=0;
  constructor(private service:UserService,private router: Router) { }

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
      console.log(this.Calories);
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
      
  this.weekdays=this.userData.currentWeek;
   this.leaderBoard=this.userData.leaderboard;
  this.badges=this.userData.badges;
   console.log("ok",this.weekdays);
   })
}
percentage(value){
 return  value.calorieIntake/value.goalCalories*100
console.log("day is" ,value);
}

}
