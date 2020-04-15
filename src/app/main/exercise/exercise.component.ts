import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {  ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
userid:any;
exerciseForm : FormGroup;
exercise_id:any;
exercise:any;
exerciseLogs:any;
calories:any;
duration:any;
user_id:any;
data={};
userPoints:any;
chooseDate:any;
tableData:any;
durations:any;
viewDate: Date = new Date();
dateInput:any;
minutes=30;
viewDateInput:any;
  constructor(private _formBuilder:FormBuilder,private toastr:ToastrService,private service:UserService,private date:DatePipe,private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.exerciseForm =this._formBuilder.group({
    entry_date:['',Validators.required],
    exercise_id:['',Validators.required],
    duration:[this.duration,Validators.required],
    user_id:['']
    })

    this.data={
      user_id:localStorage.getItem('userid'),
      date:this.date.transform(new Date(),"yyyy-MM-dd")
    }

   }

  ngOnInit() {
  this.userid = localStorage.getItem('userid');
  this.user_id=localStorage.getItem('userid'),
  this.getPoint();
  this.getTableData();
  this.getexercises();
  }
getexercises(){
  this.service.getexercise().subscribe(res=>{
    this.exercise_id=res;
    // console.log(this.exercise_id)
  })
}

getPoint(){
  this.service.userPoint(this.user_id).subscribe(res=>{
    this.userPoints=res;
    this.userPoints=this.userPoints.month;
    console.log(this.userPoints)
  })
}

upload(){
  let ngbDate = this.exerciseForm.controls['entry_date'].value;
  let endDate = ngbDate.year+'-'+ ngbDate.month+'-'+ ngbDate.day;
  let formValues = this.exerciseForm.value;
  formValues['entry_date'] = endDate;
   let id= this.exerciseForm.value;
  id['user_id']=this.userid;

  this.service.adduserexercise(this.exerciseForm.value).subscribe(res=>{
     console.log("okay",res);
    this.showSuccess();
    this.getTableData();
    this.exerciseForm.reset();
  },error=>{
    this.showError();
  })
  // console.log(this.exerciseForm.value);
}
plus(){
  this.duration = this.duration+ 1;
  // console.log(this.duration)
}
minus(){
  this.duration = this.duration - 1;
  // console.log(this.duration)
}

showSuccess(){
  this.toastr.success("Data Saved successfully");
  }

  deletesuccess(){
    this.toastr.success("Data Remove successfully");
    }
  showError(){
    this.toastr.error("Please Enter Correct data");
    }

    dltError(){
      this.toastr.error("Some Error occure");
      }

getTableData(){
 
  this.data={
    user_id:localStorage.getItem('userid'),
    date:this.date.transform(new Date(),"yyyy-MM-dd")
  }
  console.log(this.data)
  this.service.getUserExerciseTable(this.data).subscribe(res=>{
    this.tableData=res;
     console.log("table data",this.tableData)
    this.calories=this.tableData.totalCaloriesBurned;
     this.calories=this.calories.toFixed(0)
    this.exerciseLogs=this.tableData.exerciseLogs;
    // console.log(this.exerciseLogs)
  
  })
}
open(event){
 
  this.viewDateInput = event.year+'-'+ event.month+'-'+ event.day;
  this.dateInput=this.viewDateInput;
  this.data={
    user_id:localStorage.getItem('userid'),
    date:this.viewDateInput
  }
  this.service.getUserExerciseTable(this.data).subscribe(res=>{
    this.tableData=res;
     console.log("table data",this.tableData)
    this.calories=this.tableData.totalCaloriesBurned;
    this.calories=this.calories.toFixed(2)
    this.exerciseLogs=this.tableData.exerciseLogs;
  console.log("okok",this.dateInput)
  // this.dateInput=event;
})
}

caloriesburned(items){
   this.durations =items.duration;
  // this.minutes=this.minutes-this.durations
  let calories_burned_per_minute=items.exercise.calories_burned_per_minute;
  console.log(calories_burned_per_minute,this.durations)
  this.minutes= this.durations
   this.minutes=30 - this.minutes
  this.durations=this.durations*calories_burned_per_minute
   this.durations=this.durations.toFixed(2)
  return this.durations;
  
}

deleteData(id){
this.service.deleteexercise(id).subscribe(res=>{
       this.tableData=res;
       
       this.deletesuccess();
       this.getTableData();
},error=>{
  this.dltError();
})
}
}
