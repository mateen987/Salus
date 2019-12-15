import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component'
import{NutritionComponent} from './main/nutrition/nutrition.component'
import { ExerciseComponent } from './main/exercise/exercise.component';
import { ChallengeComponent } from './main/challenge/challenge.component';
import { DailyTaskComponent } from './main/daily-task/daily-task.component';
import { ChooseChallengeComponent } from './main/choose-challenge/choose-challenge.component';
import { JoinChallengeComponent } from './main/join-challenge/join-challenge.component'; 
import { BadgesComponent } from './Admin/badges/badges.component';
import { ChallengesComponent } from './Admin/challenges/challenges.component';
import { AdminExerciseComponent } from './Admin/exercise/exercise.component';
import { NutritionsComponent } from './Admin/nutritions/nutritions.component';

const routes: Routes = [

  {
    path: "register",
    component: RegisterComponent
  },

  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "nutrition",
    component: NutritionComponent
  },
  {
    path: "exercise",
    component: ExerciseComponent
  },
  {
    path: "challenge",
    component: ChallengeComponent
  },
  {
    path: "daily-task",
    component: DailyTaskComponent
  },
  {
    path: "choose-challenge",
    component: ChooseChallengeComponent
  },
  {
    path: "join-challenge",
    component: JoinChallengeComponent
  },
  {
    path:'admin/badges',
    component: BadgesComponent
  },
  {
    path:'admin/challenges',
    component: ChallengesComponent
  },
  {
    path:'admin/exercise',
    component: AdminExerciseComponent
  },
  {
    path:'admin/nutritions',
    component: NutritionsComponent
  },
  {
    path: "**",
    component: DashboardComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = [
  HomeComponent,
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  ExerciseComponent,
  ChooseChallengeComponent,
  NutritionComponent, 
  ChallengeComponent,
  DailyTaskComponent,
  JoinChallengeComponent,
  BadgesComponent,
  ChallengesComponent,
  NutritionsComponent,
  AdminExerciseComponent
]