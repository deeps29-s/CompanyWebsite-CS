// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';
// import { ServiceService} from '../../service.service';
// @Component({
//   selector: 'app-add-company',
//   templateUrl: './add-company.component.html',
//   styleUrls: ['./add-company.component.css']
// })
// export class AddCompanyComponent implements OnInit {

//   constructor(private service:ServiceService ) { }
//   addCompany=new FormGroup( {
//     userId: new FormControl(''),
//     companyName: new FormControl(''),
//     ceo: new FormControl(''),
//     turnover: new FormControl(''),
//     website: new FormControl(''),
//     stockExchange: new FormControl('')
//   } );
//   message:boolean=false;
   
//   ngOnInit(): void {
//   }
//   SaveData(){
//      console.log(this.addCompany.value );
//     this.service.saveCompanyData(this.addCompany.value).subscribe((result)=>{
//       console.log(result);
//       this.message = true;
//       this.addCompany.reset( {} );
//       this.getcompany();
//     });
//   }
//   getcompany() {
//     throw new Error('Method not implemented.');
//   }

// }
