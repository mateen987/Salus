import { Component, OnInit ,AfterViewInit } from '@angular/core';
import{UserService} from '../../services/user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
   category:any;
   challengeNo:any;
   challengecategory:any;
   data:any;
   challengedetail:any;
   finalData:any;
   name:any;
 Result:any;
 challengeCalendar:any;
challengeinfo={};
user_id:any;
userPoints:any;
  constructor(private service:UserService,private router: Router) { 
 
    // this.getdata();
// console.log(this.name);

  }
  
   ngOnInit() {

    this.user_id=localStorage.getItem('userid');
    this.getPoint();
     this.data = this.service.getuserData();
      // console.log(this.data)
      this.challenge();
   }
   getPoint(){
    this.service.userPoint(this.user_id).subscribe(res=>{
      this.userPoints=res;
      this.userPoints=this.userPoints.month;
      console.log(this.userPoints)
    })
  }

  challenge(){
   
    this.service.getCategory().subscribe(res=>{
      this.category=res;
      // console.log(this.category)
      this.challengeNo=this.data.challenge;
      this.challengecategory=this.data.category;
      this.challengecategory=parseInt(this.challengecategory)
      this.finalData=this.category[this.challengecategory-1].challenges[this.challengeNo-1]       
      this.name=this.finalData.name;
      // console.log(this.name); 
      this.service.sendName(this.name);
      
    })
  
    

  }

joinChallenge(){
  this.challengeinfo={
    user_id:localStorage.getItem('userid'),
    challenge_id:this.challengeNo
  }
this.service.joinChallenge(this.challengeinfo).subscribe(res => {
 this.challengeCalendar=res;
  // console.log(this.challengeCalendar);
  this.service.CalendarInfo(this.challengeCalendar);
   this.router.navigate(["/join-challenge"])
}, error=>{
//  console.log("error");
})

// [routerLink]="'/join-challenge'"
}

}
