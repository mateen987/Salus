import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class AdminExerciseComponent implements OnInit {
 exerciseForm:FormGroup;
exerciseInfo:any;
 exerciseData:any;

  constructor(private model:NgbModal,private formbuilder:FormBuilder,private service:UserService) { 
    this.exerciseForm=this.formbuilder.group({

      name : ['',Validators.required],
      description:['This is a new type of exercise',Validators.required],
      calories_burned_per_minute:['', Validators.required]
    })
  }

  ngOnInit() {
    this.exercises();

  }
  open(content){
    console.log("ok")
    this.model.open(content , { centered: true,size:"lg" });
  }
  upload(){
    this.service.addexercise(this.exerciseForm).subscribe(res=>{
       this.exerciseInfo=res;
       console.log(res+"successs")
    })
    console.log('error');
  }
  exercises(){
    this.service.getexercise().subscribe(res =>{
      this.exerciseData=res;
    })
  }
}
