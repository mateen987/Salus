import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  token:any;
  user:any;
  constructor(private _formBuilder:FormBuilder,private userDataService:UserService,private router: Router) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      user_email   : ['', [Validators.required, Validators.email]],
      user_pass : ['', [Validators.required, Validators.minLength(6)]]
     })
}

login(){
  //  console.log('ok',this.loginForm.value)
  this.userDataService.auth(this.loginForm.value).subscribe(response=>{
    // console.log(response);
     this.user=response;
      localStorage.setItem('token',this.user.token,);
      localStorage.setItem('userid',this.user.user_id);
   if(this.user.admin == true){
    this.router.navigate(["/admin/badges"],)
   }else{
    this.router.navigate(["/dashboard"],)
  }

   },(err: HttpErrorResponse)=>{
      //  console.log("err"+err);
   }); 

}

}