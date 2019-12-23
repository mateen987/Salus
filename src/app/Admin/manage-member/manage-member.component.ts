import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrls: ['./manage-member.component.css']
})
export class ManageMemberComponent implements OnInit {
 display:boolean=false;
 tabledata:boolean=true;
  constructor() { }

  ngOnInit() {
  }
  editData(){
  this.display=!this.display;
  this.tabledata=true;
  }

}
