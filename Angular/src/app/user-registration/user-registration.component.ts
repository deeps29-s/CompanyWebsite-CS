import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  public registerForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]

     
      
  })
}
register(){
  // {{debugger}}
this.http.post<any>("https://localhost:44365/api/Registration/CreateRegistration",this.registerForm.value)
.subscribe(res=>{
  console.log(res);
  alert("Registered Successfully!");
  this.registerForm.reset();
  this.router.navigate(['login']);
 },err=>{
   alert("Something went wrong")
})
}


}
