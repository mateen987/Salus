import { Component, OnInit, Input } from '@angular/core';
import {DatePipe} from '@angular/common';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})


export class NutritionComponent implements OnInit {
user_id:any;
date:any;
MealID:any;
data={};
favourite={};
userData:any;
Calories:any;
Category:any;
exercise:any;
mealData={};
Carbs:any;
Fats:any;
Proteins:any;
foodItemID:String;
mealReturnId:any
favorite:boolean=false
Serving:any;
searchText:any;
searchword:any;
Sugar:any;
Meals:any;
userMeal:any;
dateInput:any;
userPoints:any;
favouriteMeal:any;
show:boolean=true;
favrotieFoodItem={};
nutritionData:any;
searchTextt:any;
MealDataResponse:any;
userFavorite:any
foodName:any;
viewDateInput:any;
viewDate: Date = new Date();
  constructor(private datenow:DatePipe,private service:UserService,private toastr:ToastrService,
    private model:NgbModal,) {
  
      this.getmeals()
   }

  ngOnInit() {
    this.user_id = localStorage.getItem('userid');
    this.getPoint();
     this.getallfood();
   this.date = this.datenow.transform(new Date(),"yyyy-MM-dd");
   this.getnutrition();
    this.userselectedFavorite();
    this.favouriteMeals();
    
  }


  getPoint(){
    this.service.userPoint(this.user_id).subscribe(res=>{
      this.userPoints=res;
      console.log(this.userPoints)
      this.userPoints=this.userPoints.month;
    
    })
  }

  showSuccess(){
    this.toastr.success("Data Saved successfully");
    }
    successfullyAdded(){
      this.toastr.success(" Food item successfully added into favorite list ");
    }
    showDltSuccess(){
      this.toastr.success("Data Delete successfully");
      }
    showError(){
      this.toastr.error("Please Enter Correct data");
      }
      tryAgain(){
        this.toastr.error("Please Try again");
        }

      deleteData(data){
        this.service.removeNutritionFood(data).subscribe(res=>{
          this.showDltSuccess();   
          this.getnutrition();
        },error=>{
          this.tryAgain(); 
        })
             
      }

    open(content,name){

      this.MealID=name;
     this.mealData={
      date:this.date,
      user_id: this.user_id,
      type:this.MealID,
      favorite:this.favorite
     }
     this.service.addMeal(this.mealData).subscribe(res=>{
        this.MealDataResponse=res;
        this.mealReturnId= this.MealDataResponse.meal.id;
     
     })

     console.log(this.mealData)
      this.model.open(content , { size:"lg" });
      this.getallfood();
  }

  getnutrition(){
    this.nutritionData={
      user_id : this.user_id,
      date : this.date
    }
       this.service.usermeals(this.nutritionData).subscribe(res=>{
         this.userData=res;
         this.Calories=this.userData.dateTotalsArray.Calories;
         this.Carbs=this.userData.dateTotalsArray.Carbs;
         this.Fats=this.userData.dateTotalsArray.Fats;
         this.Proteins=this.userData.dateTotalsArray.Proteins;
         this.Sugar=this.userData.dateTotalsArray.Sugars;
         this.Meals=this.userData.meals
        this.foodName=this.userData.meals.logs;
          //  this.foodName=this.foodName.logs
           console.log(this.foodName)               
         console.log("meals",this.Meals)
      })
  }
  showFood(data){
    if(data.type =="A type" && data.logs.length !== 0){
      return data.logs[0].food.name;
    } 
    else {
      return 0;
    }
  }
  lunchFood(data){
    if(data.type =="B type" && data.logs.length !== 0){
      return data.logs[0].food.name;
    } 
    else {
      return 0;
    }
  }
  favoritefood(data){
   try {
    if(data.logs[0].food.favorite == true ){
      return 1;
  }
  if(data.logs[0].food.favorite == false ){
   return 0;
}
   } catch (error) {
    // console.log("error")
    return 0;
   } 
   
// else {
//   console.log('zero')
//   return 0;
// }
  }

  dinnerFood(data){
    if(data.type == "C type" && data.logs.length !== 0){
      return data.logs[0].food.name;
    } 
    else {
      return 0;
    }
  }

  snackFood(data){
    if(data.type == "D type" && data.logs.length !== 0){
      return data.logs[0].food.name;
    } 
    else {
      return 0;
    }
  }

favouriteMeals(){
  this.data={
    user_id: this.user_id,
    date: this.date
  }
  this.service.FavouriteMeal(this.data).subscribe(res=>{
    this.favouriteMeal=res;
    console.log("okay",this.favouriteMeal);
  })
}
userselectedFavorite(){

  this.service.userFavouriteMeals(this.user_id).subscribe(res=>{
        this.userFavorite=res;
        console.log(this.userFavorite)
  })
}
getmeals(){
  this.service.mealsForNutrition().subscribe(res=>{
    this.userMeal=res;
    console.log(this.userMeal)
  })
}
getallfood(){
  this.service.foodName().subscribe(res=>{
       this.foodName=res;
       console.log(this.foodName);
  })
}

dairyevent(event){
  console.log("how's that",this.dateInput);
  this.viewDateInput = event.year+'-'+ event.month+'-'+ event.day;
  this.dateInput=this.viewDateInput;
  this.nutritionData={
    user_id : this.user_id,
    date : this.dateInput
  }
  this.service.usermeals(this.nutritionData).subscribe(res=>{
    this.userData=res;
    this.Calories=this.userData.dateTotalsArray.Calories;
    this.Carbs=this.userData.dateTotalsArray.Carbs;
    this.Fats=this.userData.dateTotalsArray.Fats;
    this.Proteins=this.userData.dateTotalsArray.Proteins;
    this.Sugar=this.userData.dateTotalsArray.Sugars;
    this.Meals=this.userData.meals
   this.foodName=this.userData.meals.logs;
     //  this.foodName=this.foodName.logs
      console.log(this.foodName)               
    console.log("meals",this.Meals)
 })

  // this.viewDateInput = event.year+'-'+ event.month+'-'+ event.day;
  // this.dateInput=this.viewDateInput;

}
uploaddata(){
  console.log(this.MealID)
  this.data={
    food_id: parseInt(this.Category),
    meal_id: this.mealReturnId,
    servings:this.Serving
  }
  console.log(this.data)
   this.service.addNutritionFood(this.data).subscribe(res=>{
     res=res;
     console.log(res);
     this.showSuccess();
     this.getnutrition();
     this.model.dismissAll();
   },error=>{

    this.showError();
   
  })

}

addFoodFavorite(item){

  this.favrotieFoodItem={
    user_id:this.user_id,
    food_id:item.logs[0].food_id,
  }
  console.log("food items",this.favrotieFoodItem)
  this.service.favouriteFood(this.favrotieFoodItem).subscribe(res=>{
    res=res;
    console.log("response of favrt",res);
    this.favouriteMeals();
    this.getnutrition();
    this.successfullyAdded();
  })

}

value(item){
this.foodItemID=item;
this.favourite={
  user_id:this.user_id,
  food_id:this.foodItemID,
}
this.service.favouriteFood(this.favourite).subscribe(res=>{
       res=res;
       console.log("response of favrt",res);
       this.favouriteMeals();
})


}
searchFood(){
  console.log(this.searchword,"ok")
  this.service.searchfood(this.searchword).subscribe(res=>{
    this.foodName=res
    console.log(this.searchword)
  })
}


}

