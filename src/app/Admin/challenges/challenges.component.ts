import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { parseJSON } from 'date-fns';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {
  challengeForm:FormGroup;
  categoryData:any;
  categoryValue:any;
  subCategory=[];
  Category:any;
  allChallenges:any;
  adminpoints:any;
  selectUserPoint:any;
sample=[1];
obj:any;
  companyId=[];
  companyName:any;
  constructor(private _formBuilder:FormBuilder,private service:UserService,private router:Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,private toastr:ToastrService) 
    { 

   this.challengeForm = this._formBuilder.group({
     name : ['',Validators.required],
     img_location:['',Validators.required],
      //  Category:[],
     categoryIDs:[ Validators.required],
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
    this.getAllChallenges();
    // console.log(this.Category)
  
  }
  open(id){
    //  this.obj=JSON.stringify(id)
    
     for(let v=0;v<=this.categoryData.length ; v++){
      // console.log("ok so",this.categoryValue[v].id);
   if(this.categoryData[v].id==id){
        this.subCategory= this.categoryData[v].children;  
      break 
      //  console.log("ok so",this.subCategory);
     };
    // this.subCategory=this.categoryValue
     }
    // console.log("okok",this.subCategory)
     
  }
  itemselect(items){
  // console.log("okay"+items);
  }
  showSuccess(){
    this.toastr.success("Data Saved successfully");
    }
    dltSuccess(){
      this.toastr.success("Data Delete successfully");
      }
    showError(){
      this.toastr.error("Please Enter Correct data");
      }
      errorMessage(){
        this.toastr.error("Some Error occure");
      }
      opensubCategory(id){
     this.subCategory=id;
      }
  upload(){
    console.log("ok")
    let ngbDate = this.challengeForm.controls['end_date'].value;
    let endDate =  ngbDate.year+'-'+ ('0' + ngbDate.month).slice(-2) +'-'+ ('0'+ngbDate.day).slice(-2);
    let formValues = this.challengeForm.value;
    formValues['end_date'] = endDate;
    let ngbstartDate = this.challengeForm.controls['start_date'].value;
    let startDate =ngbstartDate.year+'-'+ ('0' + ngbstartDate.month).slice(-2) +'-'+ ('0'+ngbstartDate.day).slice(-2);
    let formstartValues = this.challengeForm.value;
    formstartValues['start_date'] = startDate;
    // console.log(endDate);
    // console.log(startDate);
     let company = this.challengeForm.controls['categoryIDs'].value;
     let array = JSON.parse("[" + company + "]");
      let groupid= this.challengeForm.value
      groupid['categoryIDs'] = array;

     console.log(this.challengeForm.value);

    this.service.uploadchallenges(this.challengeForm.value).subscribe(res=>{

      this.showSuccess();
      this.getAllChallenges();
      this.challengeForm.reset();
    
    },error=>{
      this.showError();
    })
 

  }
  getCategoryData(){
    this.service.getCategory().subscribe(res=>{
    this.categoryData = res;
    // this.categoryData = this.categoryData.filter(x=>x.parent_id===null)
    // this.categoryValue=this.categoryData
    console.log("okfuck",this.categoryData);
// this.categoryValue=this.categoryData.length;
// for(let i=0 ; i<= this.categoryValue;i++ ){
//   this.categoryData=this.categoryData[i]
//   if(this.categoryData.parent_id==null){
//   this.categoryData= this.categoryData[i]
//   console.log("okok",this.categoryData) 
//   }
  
    })
  }
  category(data){
   if(data.parent_id==null){
    return this.categoryData=data.name;
    //  console.log("data",data)
    // return data.name[0].food.name;
   }
   return 0;

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
getAllChallenges(){
  this.service.getchallenges().subscribe(res=>{
    this.allChallenges=res;
    console.log('all challenges',this.allChallenges)
  })
}

deleteData(id){
console.log('id is',id)
this.service.deleteChallenge(id).subscribe(res=>{
  console.log(res);
  this.dltSuccess();
  this.getAllChallenges();
},error=>{
  this.showError();
  
})
}


}
