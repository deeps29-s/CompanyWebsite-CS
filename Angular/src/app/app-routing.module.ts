import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { CompanyListComponent } from './company-list/company-list.component';
//import { AddCompanyComponent } from './company-list/add-company/add-company.component';
import { AllCompaniesComponent } from './company-list/all-companies/all-companies.component';
//import { EditCompanyComponent } from './company-list/edit-company/edit-company.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'user-registration', component:UserRegistrationComponent},
  {path: 'company-details', component:CompanyDetailsComponent},
  {path: 'company-list', component:CompanyListComponent},
  
  {path:'all-companies', component:AllCompaniesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
