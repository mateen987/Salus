import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class AdminExerciseComponent implements OnInit {
exerciseForm:FormGroup;
exerciseInfo:any;
exerciseData:any;
modalData:any;
name:any;
calories:any;
getsearchid:any;

  constructor(private model:NgbModal,private toastr:ToastrService, private router:Router,
    private formbuilder:FormBuilder,private service:UserService) { 
    this.exerciseForm=this.formbuilder.group({

      name : ['',Validators.required],
      description:['This is a new type of exercise',Validators.required],
      calories_burned_per_minute:['', Validators.required]
    })
  }

  ngOnInit() {
    this.exercises();

  }
  open(content,items,index){
  
    this.model.open(content , { centered: true,size:"lg" });
   this.modalData=items;
  //  console.log("item"+items)
   this.modalData.name= items.name;
   this.modalData.calories=items.calories_burned_per_minute;
  //  console.log("okay data is here"+this.modalData);
  }
  showSuccess(){
    this.toastr.success("Data Saved successfully");
    }
    showError(){
      this.toastr.error("Please Enter Correct data");
      }
  upload(){
    this.service.addexercise(this.exerciseForm.value).subscribe(res=>{
       this.exerciseInfo=res;
      //  console.log(res+"successs")
       this.showSuccess();
       this.exerciseForm.reset();
    },error=>{
      // console.log('error');
      this.showError();
    })
   
  }
  exercises(){
    this.service.getexercise().subscribe(res =>{
      this.exerciseData=res;
    })
  }
  deleteData(id){
    // console.log("id is "+id);
    this.service.deleteExercise(id).subscribe(res =>{
      this.exerciseData=res;  
      this.exercises();
    })
  }

  updateData(){
 this.service.updateExercise(this.modalData).subscribe(res=>{
 this.exercises();
 })
  }

search(){
  // console.log("okay",this.getsearchid);
this.service.getSearchExercise(this.getsearchid).subscribe(res=>{
      return this.exerciseData=res;

})

}
logout(){

  localStorage.removeItem('userid');
    localStorage.clear();
    this.router.navigate(["/"],)
}

}
