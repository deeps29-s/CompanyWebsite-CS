import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
    email:any;
    password:any;
    isemailempty: any;


  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      
      password:['',Validators.required]
    })
  }
  login(){
    const body={email:this.loginForm.value.email, password:this.loginForm.value.password};
    this.http.post<any>("https://localhost:44365/api/Registration/login",body)
   .subscribe(res=>{
      
      localStorage.setItem('Token', res.token);
      localStorage.setItem('UserName', res.userName);
      localStorage.setItem('Id', res.id);
      localStorage.setItem('Email', res.email);
     
         alert("Successfully logged in!!");
         this.loginForm.reset();
         this.router.navigate(['company-details']);
        },validate=>{
          debugger;
        

        if(localStorage.getItem('Email')!=null){
          debugger;
          alert("Successfully logged in!!")
          this.loginForm.reset();
          this.router.navigate(['company-details']);
        }
        else{
          alert("user not found");
        }
       }

     );

  }

  }
