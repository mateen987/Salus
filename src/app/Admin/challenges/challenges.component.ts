import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  challengeForm:FormGroup;
  categoryData:any;
  subCategory=[];
  Category:any;
  adminpoints:any;
  selectUserPoint:any;
sample=[1];
  companyId=[];
  companyName:any;
  constructor(private _formBuilder:FormBuilder,private service:UserService,private router:Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,private toastr:ToastrService) 
    { 
   this.challengeForm = this._formBuilder.group({
     name : ['',Validators.required],
     img_location:['',Validators.required],
      //  Category:[],
     categoryIDs:[this.subCategory,Validators.required],
     start_date:['',Validators.required],
     end_date:['',Validators.required],
     point_id:[this.selectUserPoint,Validators.required],
     active:[this.companyId,Validators.required],
      instructions:[''],
      groupIDs:[this.sample],
     description:['',Validators.required]
   })

  }

  ngOnInit() {
    this.getCategoryData();
    this.getpoints();
    this.getcompanyName();
    // console.log(this.Category)
  
  }
  open(id){
  // console.log(id);
  this.subCategory=this.categoryData[id-1].children;
  }
  itemselect(items){
  // console.log("okay"+items);
  }
  showSuccess(){
    this.toastr.success("Data Saved successfully");
    }
    showError(){
      this.toastr.error("Please Enter Correct data");
      }
  upload(){
    let ngbDate = this.challengeForm.controls['end_date'].value;
    let endDate = ngbDate.year+'-'+ ngbDate.month+'-'+ ngbDate.day;
    let formValues = this.challengeForm.value;
    formValues['end_date'] = endDate;
    let ngbstartDate = this.challengeForm.controls['start_date'].value;
    let startDate = ngbstartDate.year+'-'+ ngbstartDate.month+'-'+ ngbstartDate.day;
    let formstartValues = this.challengeForm.value;
    formstartValues['start_date'] = startDate;
    let company = this.challengeForm.controls['categoryIDs'].value;
    var array = JSON.parse("[" + company + "]");
     let groupid= this.challengeForm.value
     groupid['categoryIDs'] = array;

    // console.log(this.challengeForm.value);

    this.service.uploadchallenges(this.challengeForm.value).subscribe(res=>{
      // console.log('success'+res);
      this.showSuccess();
      this.challengeForm.reset();
    },error=>{
      this.showError();
    })
 

  }
  getCategoryData(){
    this.service.getCategory().subscribe(res=>{
    this.categoryData = res;
    // console.log(this.categoryData)
   
    })
  }
  getpoints(){
    this.service.points().subscribe(res => {
       this.adminpoints = res 
      })
    }
    getcompanyName(){
      this.service.getcompany().subscribe(res => {
        this.companyName=res;
        // console.log(this.companyId);
       
      })
   }
   logout(){

    localStorage.removeItem('userid');
      localStorage.clear();
      this.router.navigate(["/"],)
  }

}
