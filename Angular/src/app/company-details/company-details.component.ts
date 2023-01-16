import { Component } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent {
  constructor() { }
  user:any;
  ngOnInit(): void{
    this.user=localStorage.getItem('UserName');
  }
   userId : number = 0;
   companyName : string = '';
   ceo : string = '';
   turnover : string = '';
   website : string = '';
   stockExchange : string = '';

   logout(){
    localStorage.clear();
   }

}
