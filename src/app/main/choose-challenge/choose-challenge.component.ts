import { Component, OnInit } from '@angular/core';
import{ChallengeComponent} from '../challenge/challenge.component'
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-challenge',
  templateUrl: './choose-challenge.component.html',
  styleUrls: ['./choose-challenge.component.css']
})
export class ChooseChallengeComponent implements OnInit {
category:any;
userPoints:any;
Category:any;
subCategory:any;
selectedItem:any;
challeng:any;
user_id:any;
data={}
  constructor(private service:UserService,private router: Router) { }

  ngOnInit() {
    this.user_id=localStorage.getItem('userid');
    this.challenge();
    this.getPoint();
    this.getbadges();
   
  }
  getbadges(){
    this.service.totalBadges().subscribe(res=>{
      this.challeng=res;
     console.log(this.challeng)
    })
  }

  getPoint(){
    this.service.userPoint(this.user_id).subscribe(res=>{
      this.userPoints=res;
      this.userPoints=this.userPoints.month;
      console.log(this.userPoints)
      localStorage.setItem('userPoints',this.userPoints);
    })
  }

  open(id){
     console.log(id);
     for(let v=0;v<=this.category.length ; v++){
   if(this.category[v].id==id){
        this.subCategory= this.category[v].children;  
      break 
     };


     console.log(this.subCategory)
  }}
  challenge(){
    this.service.getCategory().subscribe(res=>{
      this.category=res;
       console.log("han g",this.category)
    })
  }

  moredescriptive(id){
    this.data={
      category:this.Category,
      challenge:id,
    }

    this.service.sendData(this.data);
    this.router.navigate(["/challenge"],)
  }

}
