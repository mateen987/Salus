import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.css']
})
export class ManageMemberComponent implements OnInit {
 display:boolean=false;
 tabledata:boolean;
 searchText:any;
 point:any;
 data={};
 name:any;
 userPointsID:any;
 companyName:any;
 newPoints:any;
 selectedPoint:any;
 tableRecord:any;
 entryDate:any;
  constructor(private datenow:DatePipe, private toastr:ToastrService,private model:NgbModal,private router:Router, private formbuilder:FormBuilder,private service:UserService) { }

  ngOnInit() {
    this.getData();
    this.tabledata=true;
    this.getpoints();
    this.entryDate=this.datenow.transform(new Date(),"yyyy-MM-dd");
  }
  editData(item){
   
     this.companyName=item.company.name
     this.point=item.points.points;
    this.name=item.display_name
    console.log(item.display_name, item.points.points,this.companyName);
  this.display=!this.display;
  this.tabledata=false;
  }
  getData(){
    this.service.getUsers().subscribe(res=>{
       this.tableRecord=res;
     console.log(this.tableRecord)
    })
  }
  showSuccess(){
    this.toastr.success("Data Saved successfully");
    }
    showError(){
      this.toastr.error("Please Enter Correct data");
      }

  company(items){
     this.companyName=items.company.name;
     return this.companyName;
  }
  savePoint(){
    console.log('okok',this.selectedPoint)
    if(this.selectedPoint != undefined || 0){
      this.data={
        userID:localStorage.getItem('userid'),
        pointID:this.selectedPoint,
        entryDate:this.entryDate
      }
      // console.log("data",this.data)
      this.service.trackPoint(this.data).subscribe(res=>{
         res=res;
        //  console.log('ok')
         this.showSuccess();
         this.tabledata=true;
         this.display=false;
      },error=>{
        this.showError
      })

    }
   
  }
  points(items){
    this.point=items.points.points;
    return this.point;
 }
 getpoints(){
   this.service.points().subscribe(res=>{
   this.userPointsID=res;
  //  this.userPointsID=this.userPointsID.id;
  //  console.log(this.userPointsID)
   })
 }
  logout(){

    localStorage.removeItem('userid');
      localStorage.clear();
      this.router.navigate(["/"],)
  }

}
