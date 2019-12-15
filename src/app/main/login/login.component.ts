import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private _formBuilder:FormBuilder,private userDataService:UserService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      user_email   : ['', [Validators.required, Validators.email]],
      user_pass : ['', [Validators.required, Validators.minLength(6)]]
     })
}

login(){
console.log('ok',this.loginForm.value)
  this.userDataService.auth(this.loginForm.value).subscribe((reponse)=>{
    console.log(reponse);
   }); 

 

}

}