import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators, ValidationErrors,AbstractControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { RouterLinkWithHref } from '@angular/router';
//import { CompanyDetailsComponent } from 'src/app/company-details/company-details.component';
import {ServiceService} from '../../service.service';
import { AllCompany} from '../add-company/allcompanymodel';



@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {
   formValue !:FormGroup;
   allcompanymodelObj : AllCompany = new AllCompany();
   showAdd! : boolean;
   showUpdate ! : boolean;
  // companyModelObj : CompanyDetailsComponent = new CompanyDetailsComponent();
  // addCompany: any;
  // message: boolean = false;
  // service: any;
  // SaveData: any;
   //constructor(private service:ServiceService) { }
  addCompany: AllCompany[]=[];
  companydetail: AllCompany[]=[];
  //formValue: any;
  //listcompany: any;
   
  //deletecompany: ArrayBuffer;
  //deletecompany: deletecomp[row]=[row.id];
  constructor(private formbuilder: FormBuilder, private Servic:ServiceService) { }
  // companiesData:any=[];

  ngOnInit(): void {
    //this.getcompany();
    //this.getcompanylist();
    //this.getcompanylist();
    //this.DelCompany();
    // this.service.getAllCompany().subscribe((allData)=>{
    //   console.log( allData );
    //   this.companiesData=allData;
    // });

     this.formValue = this.formbuilder.group({
      id :[''],
       userId : [''],
      //  companyName : ['',[this.validateCompanyName.bind(this)]],
      companyName : [''],
       ceo : [''],
       turnover : [''],
       website : [''],
       stockExchange : ['']
     });
     this.getcompany();
  }
  
   
   validateCompanyName(control: FormControl){
    let companyName = control.value;
    let existCompany = this.companydetail.find(c => c.companyName === companyName);
    if(existCompany){
      return {companyNameExists: true}
    }
    return null;
   }

    getcompany(){
     this.Servic.getAllCompany().subscribe(res =>{this.addCompany=res;})
   }

  

  deleteCompany(item: any){
    this.Servic.deletec(item.userId).subscribe(res=>{
      alert("company is deleted")
      this.getcompany();
    })
    this.getcompany();
  }
  onEdit(item : any){
//debugger;

    this.showAdd = false;
    this.showUpdate = true;
    this.allcompanymodelObj.userId = item.userId;
    this.formValue.controls['id'].setValue(item.id);

    this.formValue.controls['userId'].setValue(item.userId);
    this.formValue.controls['companyName'].setValue(item.companyName);
    this.formValue.controls['ceo'].setValue(item.ceo);
    this.formValue.controls['turnover'].setValue(item.turnover);
    this.formValue.controls['website'].setValue(item.website);
    this.formValue.controls['stockExchange'].setValue(item.stockExchange);
  }

  updatecompanydetails(){
//debugger;
    var v=JSON.parse(localStorage.getItem('Id') || '{}');
    // this.allcompanymodelObj=v;

    // this.allcompanymodelObj.userId = this.formValue.value.userId;
    this.allcompanymodelObj.id = this.formValue.value.id;
    this.allcompanymodelObj.userId = v;
    this.allcompanymodelObj.companyName = this.formValue.value.companyName;
    this.allcompanymodelObj.ceo = this.formValue.value.ceo;
    this.allcompanymodelObj.turnover = this.formValue.value.turnover;
    this.allcompanymodelObj.website = this.formValue.value.website;
    this.allcompanymodelObj.stockExchange = this.formValue.value.stockExchange;

    this.Servic.UpdateCompany(this.allcompanymodelObj,this.allcompanymodelObj.userId)
     .subscribe(res=>{
     
      console.log(res);
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getcompany();
    },
    err=>{
      alert("Something went wrong");
    })
  }
  clickAddCompany(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postcompanydetails(){
    var v=JSON.parse(localStorage.getItem('Id') || '{}');
    //this.allcompanymodelObj.id=v;
    // this.allcompanymodelObj.userId=j;
//debugger;
    this.allcompanymodelObj.userId = v;
    this.allcompanymodelObj.companyName = this.formValue.value.companyName;
    this.allcompanymodelObj.ceo = this.formValue.value.ceo;
    this.allcompanymodelObj.turnover = this.formValue.value.turnover;
    this.allcompanymodelObj.website = this.formValue.value.website;
    this.allcompanymodelObj.stockExchange = this.formValue.value.stockExchange;

    this.Servic.postCompany(this.allcompanymodelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Company added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getcompany();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  //    getcompanylist(){
  //      this.service.getAllCompany()
  //      .subscribe((res: allcompany[])=>{
  //       this.addCompany = res;

  //    })
  // }

  logout(){
    localStorage.clear();
   }
 
}
