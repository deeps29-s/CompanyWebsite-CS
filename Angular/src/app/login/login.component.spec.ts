import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { of } from 'rxjs';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockHttpService: jasmine.SpyObj<HttpClient>
 let  logcc:any;

  beforeEach(async () => {

    mockHttpService = jasmine.createSpyObj('HttpClient', [
      'post'
    ]);
    logcc = [{
      "id":1002,
      "userName":"Anuj",
      "email":"anuj@gmail.com",
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE3NzU2ODYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjE2MDUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjYxNjA1In0.LVL0OzWTK0bQCIbirZE8NDpDeryAOTMhWFHXoi1THyE"

    }]
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [HttpClientModule,FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    localStorage.clear()
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    mockHttpService.post.and.returnValue(logcc);
    component.loginForm.value.email='anuj@gmail.com';
    component.loginForm.value.password='32145';

    

    component.login()
    
    expect(component).toBeTruthy();
  });
});
