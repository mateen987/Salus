import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { HttpErrorResponse } from '@angular/common/http';
import {  ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {
  cities=[];
  badges:any;
  selectedItems = [];
  dropdownSettings: any = {};
  ShowFilter = false;
  limitSelection = false;
  selectUserPoint:any;
  adminpoints: any;
  
  companyName:any;
  companyId=[];

  badgeForm: FormGroup;
  selectedFile:File=null;
  startdate:any;
  endDate:any;
  value:any;
  token:any;
  end_date:Date;
  constructor(private _formBuilder:FormBuilder,private service:UserService,private router:Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,private toastr:ToastrService) { 

    this.badgeForm = this._formBuilder.group({
      name   : ['', Validators.required],
      start_date : ['', Validators.required],
      end_date : ['', Validators.required],
      point_id : [this.selectUserPoint,Validators.required],
       groupIDs: [this.companyId,Validators.required],
       active:['1'],
      img_location:['',Validators.required]
      
     })
   
  }
  itemselect(point){
    // console.log("selected item"+point)
  }
  getcompanyName(){
     this.service.getcompany().subscribe(res => {
       this.companyName=res;
      //  console.log(this.companyId);
      
     })
  }
  getpoints(){
      this.service.points().subscribe(res => {
         this.adminpoints = res 
       
        })
 
      }
     
  
  ngOnInit() {
this.getpoints();
this.getbadges();
this.getcompanyName();
    this.cities =[
      { item_id: 1, item_text: 'lahore' },
      { item_id: 2, item_text: 'islamabad' },
      { item_id: 3, item_text: 'skt' },
  ];
  this.selectedItems = [];
  this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: this.ShowFilter
  };
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
  
  onItemSelect(item_id: any) {
    // console.log('onItemSelect', item_id);
}
onSelectAll(items: any) {
    // console.log('onSelectAll', items);
}
toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}
  
  onFileChanged(event) {
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.badgeForm.get('img_location').setValue(file);
    }
    // this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile)
  }
  selectChangeHandler(event:any){
    this.value = event.target.value;
    // console.log(this.value);
    // console.log("ok",this.end_date);
  }
  newSkill(): FormGroup {
    return this._formBuilder.group({
      active: ''
    })
 }
 
upload(){
  let ngbDate = this.badgeForm.controls['end_date'].value;
  let endDate = ngbDate.year+'-'+ ('0' + ngbDate.month).slice(-2) +'-'+ ('0'+ngbDate.day).slice(-2) ;
  let formValues = this.badgeForm.value;
  formValues['end_date'] = endDate;

  let ngbstartDate = this.badgeForm.controls['start_date'].value;
  let startDate = ngbstartDate.year+'-'+ ('0' + ngbstartDate.month).slice(-2) +'-'+ ('0'+ngbstartDate.day).slice(-2);
  let formstartValues = this.badgeForm.value;
  formstartValues['start_date'] = startDate;

  let company = this.badgeForm.controls['groupIDs'].value;
  var array = JSON.parse("[" + company + "]");
   let groupid= this.badgeForm.value
   groupid['groupIDs'] = array;
  //  const fd=new FormData();
  //   fd.append('img_location', this.selectedFile,);
  //   fd.append('name', this.badgeForm.get('name').value);
  //   fd.append('start_date', this.badgeForm.get('start_date').value);
  //   fd.append('end_date', this.badgeForm.get('end_date').value);
  //   fd.append('active', this.badgeForm.get('active').value);
  //   fd.append('groupIDs', this.badgeForm.get('groupIDs').value);

   console.log(this.badgeForm.value)
   this.service.postbadge(this.badgeForm.value).subscribe(res =>{
  //  console.log("okg"+res);
   this.showSuccess();
   this.getbadges();
    this.badgeForm.reset();
   },error=>{
    this.showError();
   }
   ) 
  
}


getbadges(){
  this.service.totalBadges().subscribe(res=>{
    this.badges=res;
   console.log(this.badges)
  })
}
deleteData(id){
  
 this.service.deleteBadge(id).subscribe(res=>{
   this.dltSuccess();
   this.getbadges();
 },error =>{
    this.errorMessage();
 })
}
logout(){

  localStorage.removeItem('userid');
    localStorage.clear();
    this.router.navigate(["/"],)
}

}
