import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html',
  styleUrls: ['./nutritions.component.css']
})
export class NutritionsComponent implements OnInit {

  nutritionForm:FormGroup;
  result:any;
  tableData:any;
  modaldata:any;
  indexid:any;
  name:any;
  calories:any;
  protein:any;
  carbs:any;
  fats:any;
  sugar:any;
  currentDate:any;
  constructor(private model:NgbModal, private _formBuilder:FormBuilder,private service:UserService,
    private ngbDateParserFormatter: NgbDateParserFormatter,private date:DatePipe) { 
 
  this.nutritionForm=this._formBuilder.group({
    name:['',Validators.required],
    description:['This is a new type of food',Validators.required],
    measurement_id:[1,Validators.required],
    calories:['',Validators.required],
    proteins:['',Validators.required],
    fats:['',Validators.required],
    carbs:['',Validators.required],
    sugars:['',Validators.required],
    serving_size:['5',Validators.required],

  })
    }

  ngOnInit() {
    this.nutritionTable();
  }
  open(content,items,index){
    console.log("ok")
    this.model.open(content , { centered: true,size:"lg" });
    console.log("items",items);
    this.modaldata=items;
    
    this.modaldata.name=items.name;
    this.modaldata.protein=items.proteins;
    this.modaldata.carbs=items.carbs;
    this.modaldata.fats=items.fats;
    this.modaldata.sugar=items.sugars;
    this.modaldata.calories=items.calories;
    // this.modaldata.updated_at= Date
    this.modaldata.updated_at = this.date.transform(new Date(),"yyyy-MM-dd,h:mm a");
  }
  upload(){
    this.service.addFoodNutrition(this.nutritionForm.value).subscribe(data=>{
       this.result=data;
       console.log(this.result);
    })
  }
nutritionTable(){
  this.service.getnutrition().subscribe(data=>{
    this.tableData=data;
  })
}
deleteData(id){
  console.log("id is "+id);
  this.service.deletenutrition(id).subscribe(res =>{
      this.nutritionTable();
  })
}
updateData(){
  console.log("so now"+this.modaldata)
this.service.updateNutrition(this.modaldata).subscribe(res=>{
  this.nutritionTable();

})
}

}
