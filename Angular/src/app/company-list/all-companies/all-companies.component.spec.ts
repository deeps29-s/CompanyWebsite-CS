import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule }from "@angular/common/http/testing";
import { ServiceService } from 'src/app/service.service';
import { AllCompaniesComponent } from './all-companies.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { NgModule } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('unit testing of AllCompaniesComponent', async () => {
  let component: AllCompaniesComponent;
  let mockServiceService: any;
  let fixture: ComponentFixture<AllCompaniesComponent>;
  let routerspy;
//let formValue:FormGroup;
  mockServiceService = jasmine.createSpyObj(['getAllCompany','postCompany','UpdateCompany','deletec']);
  let detail:any;
  

  beforeEach(async () => {
    detail=[{
      "id": 4002,
      "userID": 3002,
      "companyName" : "accenture",
      "ceo" : "enenen",
      "turnover" : "356777",
      "website" : "www.accenture.com",
      "stockEchange" : "nse"
    },
    {
      "id": 4002,
      "userID": 3002,
      "companyName" : "accenture",
      "ceo" : "enenen",
      "turnover" : "356777",
      "website" : "www.accenture.com",
      "stockEchange" : "nse"
    }]
    
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,FormsModule,
    ReactiveFormsModule],
       
      declarations: [ AllCompaniesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[ FormBuilder,
        HttpClientModule,
        
        //ReactiveFormsModule,
        //NgModule,
      {
        provide: ServiceService,
        useValue: mockServiceService,
      },]
    })
  
    .compileComponents();

    fixture = TestBed.createComponent(AllCompaniesComponent);
    component = fixture.componentInstance;
    
  });

  it('should call getAllCompany', () => {
    mockServiceService.getAllCompany.and.returnValue(of(
      detail))
      fixture.detectChanges();
    //fixture = TestBed.createComponent(AllCompaniesComponent);
    
    expect(component.addCompany.length).toEqual(2);
  })

  it('call postCompany', () => {
    
    component.allcompanymodelObj.companyName = 'dom'
    component.allcompanymodelObj.ceo = 'dp'
    component.allcompanymodelObj.turnover = 456578
    component.allcompanymodelObj.website = 'www.dom.com'
    component.allcompanymodelObj.stockExchange = 'nse'

    mockServiceService.postCompany.and.returnValue(of(detail))
    fixture.detectChanges();
    component.postcompanydetails();

    mockServiceService.getAllCompany.and.returnValue(of(detail))
    expect(component.addCompany.length).toEqual(2);

  })

  it('should call UpdateCompany',()=>{
    component.allcompanymodelObj.companyName = 'dom'
    component.allcompanymodelObj.ceo = 'ddd'
    component.allcompanymodelObj.turnover = 456578
    component.allcompanymodelObj.website = 'www.dom.com'
    component.allcompanymodelObj.stockExchange = 'bse'

    mockServiceService.UpdateCompany.and.returnValue(of(detail))
    fixture.detectChanges();
    component.updatecompanydetails();


    mockServiceService.getAllCompany.and.returnValue(of(detail))
    expect(component.addCompany.length).toEqual(2);
  })

  it('should call deletec',()=>{
    component.allcompanymodelObj.companyName = 'dom'
    component.allcompanymodelObj.ceo = 'ddd'
    component.allcompanymodelObj.turnover = 456578
    component.allcompanymodelObj.website = 'www.dom.com'
    component.allcompanymodelObj.stockExchange = 'bse'

    mockServiceService.deletec.and.returnValue(of(detail))
    fixture.detectChanges();
   
    component.deleteCompany(item);


    mockServiceService.getAllCompany.and.returnValue(of(detail))
    expect(component.addCompany.length).toEqual(2);

  })
});
function item(item: any, any: any) {
  throw new Error('Function not implemented.');
}

