import { Component, OnInit } from '@angular/core';
import{ChallengeComponent} from '../challenge/challenge.component'
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  


@Component({
  selector: 'app-choose-challenge',
  templateUrl: './choose-challenge.component.html',
  styleUrls: ['./choose-challenge.component.css']
})
export class ChooseChallengeComponent implements OnInit {
category:any;
userPoints:any;
Category:any;
id:any;
subCategory:any;
selectedItem:any;
challeng:any;
findCategory:any
user_id:any;
data={}
  constructor(private service:UserService,private router: Router,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.user_id=localStorage.getItem('userid');
    this.challenge();
    this.getPoint();
    this.getbadges();
   
  }
  showSpinner() {
    this.SpinnerService.show();
    setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.SpinnerService.hide();
    }, 5000);
  }

  getbadges(){
 this.showSpinner();
    this.service.getchallenges().subscribe(res=>{
      this.challeng=res;
     console.log("okay we here",this.challeng)
     this.SpinnerService.hide();
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
    this.id=id;
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
 findChallenge(){
  console.log(this.category)
  this.SpinnerService.show();
// this.category=this.category.find(this.category.id == this.id)
    this.service.findCategory(this.id).subscribe(res=>{
     this.findCategory =res;
       this.challeng=this.findCategory.challenges
      console.log(this.challeng)
      this.SpinnerService.hide();
    })
 }

  moredescriptive(id){
 console.log(id)

    // this.data = {
    //   challenge:id,
    // }
    // console.log(this.data)
    this.service.sendData(id);
    this.router.navigate(["/challenge"],)
  }

}
