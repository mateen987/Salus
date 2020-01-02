import { Component, OnInit } from '@angular/core';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private service:UserService) { }

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
     this.userPoints=this.userPoints.points;
     console.log(this.userPoints)
   })
 }

getuserdata(){
   this.service.dashboardData(this.user_id).subscribe(res=>{
      this.userData=res;
      // console.log(this.userData)
      this.Calories=this.userData.today.Calories;
      this.caloriesBurned=this.userData.today.totalCaloriesBurned
      if(this.userData['wellBeing'] != null ){
        this.point++
      }
      if(this.userData['nutrition'] !=null){
        this.point++
      }
      if(this.userData['hydrate'] !=null){
        this.point++
      }
      if(this.userData['exercise'] !=null){
        this.point++
      }
      if(this.userData['sleep'] !=null){
        this.point++
      }
      if(this.userData['reflect'] !=null){
        this.point++
      }
  this.weekdays=this.userData.currentWeek;
   this.leaderBoard=this.userData.leaderboard;
  this.badges=this.userData.badges;
  // console.log(this.badges)
   })
}


}
