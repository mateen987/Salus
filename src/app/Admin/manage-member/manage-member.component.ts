import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import{UserService} from '../../services/user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.css']
})
export class ManageMemberComponent implements OnInit {
 display:boolean=false;
 tabledata:boolean=true;
 tableRecord:any;
  constructor(private model:NgbModal,private router:Router, private formbuilder:FormBuilder,private service:UserService) { }

  ngOnInit() {
    this.getData();
  }
  editData(){
  this.display=!this.display;
  this.tabledata=true;
  }
  getData(){
    this.service.getUsers().subscribe(res=>{
       this.tableRecord=res;
       console.log(this.tableRecord);
    })
  }
  logout(){

    localStorage.removeItem('userid');
      localStorage.clear();
      this.router.navigate(["/"],)
  }

}
