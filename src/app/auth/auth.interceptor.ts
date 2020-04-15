import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor ,HttpUserEvent } from "@angular/common/http";
// import { Observable } from "rxjs/Observable";
  import { Observable } from 'rxjs';
  import { tap } from "rxjs/operators";
import{Router} from '@angular/router'
import { error } from 'util';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router:Router){}

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
      if(req.headers.get('No-Auth')=='True')
      return next.handle(req.clone());

      if(localStorage.getItem('token') !=null ){
     
     const clonedreq=req.clone({
         headers:req.headers.set("Authorization","Bearer "+ localStorage.getItem('token'))
      
     });
        // body: raw
      // redirect: 'follow'
     return next.handle(clonedreq).pipe(
     tap(
         succ => { },
        err => {
  
        if(err.status==401){
            this.router.navigateByUrl('/');
        console.log("error ha")

        }
        if(err.status==422){
          console.log("here")
        }
        }
        
        ));
      }
      else{
           this.router.navigateByUrl('/')
      }

    }
    
}