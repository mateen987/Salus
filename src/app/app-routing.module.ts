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
import { ManageMemberComponent } from './Admin/manage-member/manage-member.component';
import { NutritionsComponent } from './Admin/nutritions/nutritions.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: "register",
    component: RegisterComponent,
  },

  {
    path: "dashboard",
    component: DashboardComponent,canActivate:[AuthGuard]
  },
  {
    path: "nutrition",
    component: NutritionComponent,canActivate:[AuthGuard]
  },
  {
    path: "exercise",
    component: ExerciseComponent,canActivate:[AuthGuard]
  },
  {
    path: "challenge",
    component: ChallengeComponent,canActivate:[AuthGuard]
  },
  {
    path: "daily-task",
    component: DailyTaskComponent,canActivate:[AuthGuard]
  },
  {
    path: "choose-challenge",
    component: ChooseChallengeComponent,canActivate:[AuthGuard]
  },
  {
    path: "join-challenge",
    component: JoinChallengeComponent,canActivate:[AuthGuard]
  },
  {
    path:'admin/badges',
    component: BadgesComponent,canActivate:[AuthGuard]
  },
  {
    path:'admin/challenges',
    component: ChallengesComponent,canActivate:[AuthGuard]
  },
  {
    path:'admin/exercise',
    component: AdminExerciseComponent,canActivate:[AuthGuard]
  },
  {
    path:'admin/nutritions',
    component: NutritionsComponent,canActivate:[AuthGuard]
  },
  {
    path:'admin/manage-member',
    component: ManageMemberComponent,canActivate:[AuthGuard]
  },

  {
    path: "**",
    component: LoginComponent,
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
  ManageMemberComponent,
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