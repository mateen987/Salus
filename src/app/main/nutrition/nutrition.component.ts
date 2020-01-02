import { Component, OnInit, Input } from '@angular/core';
import {DatePipe} from '@angular/common';
import{UserService} from '../../services/user.service'
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ToastrService } from 'ngx-toastr';


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
userData:any;
Calories:any;
Category:any;
exercise:any;
mealData={};
Carbs:any;
Fats:any;
Proteins:any;
mealReturnId:any
favorite:boolean=false
Serving:any;
Sugar:any;
Meals:any;
userMeal:any;
userPoints:any;
favouriteMeal:any;
show:boolean=true;
nutritionData:any;
MealDataResponse:any;
userFavorite:any
foodName:any;
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
      this.userPoints=this.userPoints.points;
      console.log(this.userPoints)
    })
  }

  showSuccess(){
    this.toastr.success("Data Saved successfully");
    }
    showError(){
      this.toastr.error("Please Enter Correct data");
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
         console.log(this.Meals)
      })
  }
  
favouriteMeals(){
  this.service.FavouriteMeal(this.data).subscribe(res=>{
    this.favouriteMeal=res;
    console.log(this.favouriteMeal);
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
     this.model.dismissAll();
   },error=>{
    this.showError();
   })
}





}

