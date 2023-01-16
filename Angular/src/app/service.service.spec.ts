import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { of,map,pipe } from 'rxjs';
import { NgModule } from '@angular/core';


export class AppModule { }
describe('Unit testing of ServiceService', () => {
  let service: ServiceService;
  let mockHttpService: jasmine.SpyObj<HttpClient>;
  let detaills: any;
    beforeEach(() => {
     detaills=[{
        
            "id": 4002,
            "userID": 3002,
            "companyName" : "accenture",
            "ceo" : "enenen",
            "turnover" : "356777",
            "website" : "www.accenture.com",
            "stockEchange" : "nse"
    },]
    mockHttpService = jasmine.createSpyObj('HttpClient', [
        'get',
        'post',
        'delete',
        'put',
      ]);
      service = new ServiceService(mockHttpService);
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [HttpClient]
    });
    
  });

 
  
it('should call get', () => {
    let response:any;
    mockHttpService.get.and.returnValue(of( detaills));
    service.getAllCompany().subscribe(( detaills) => {
        response =  detaills;
    })
    
    
    expect(service).toBeTruthy();
  });

  it('should call post', () => {
    let response:any;
    mockHttpService.post.and.returnValue(of(detaills));
    service.postCompany(detaills).subscribe((detaills) => {
        response =  detaills;
    })

    
    expect(service).toBeTruthy();
    
  })

  it('should call put', () => {
    let response:any;
    mockHttpService.put.and.returnValue(of(detaills));
    service.UpdateCompany(detaills,detaills).subscribe((detaills: any) => {
        response =  detaills;
    })
    expect(service).toBeTruthy();
    

  })

  it('should call delete', () => {
    let response:any;
    mockHttpService.delete.and.returnValue(of(detaills));
    service.deletec(detaills).subscribe((detaills: any) => {
        response =  detaills;
    })
    
    
    expect(service).toBeTruthy();

  })
});
