import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { UserRegistrationComponent } from './user-registration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule }from '@angular/router';
import { FormGroup,FormsModule,FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { of } from 'rxjs';


describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let mockHttpService: jasmine.SpyObj<HttpClient>;
  let logcc:any;

  beforeEach(async () => {
    mockHttpService = jasmine.createSpyObj('HttpClient',[
        'post',
    ]);

    logcc=[{
        "id":1002,
      "userName":"Anuj",
      "email":"anuj@gmail.com",
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE3NzU2ODYsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NjE2MDUiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjYxNjA1In0.LVL0OzWTK0bQCIbirZE8NDpDeryAOTMhWFHXoi1THyE"

    }]
    await TestBed.configureTestingModule({
       imports:[ HttpClientTestingModule,ReactiveFormsModule],
      declarations: [ UserRegistrationComponent ],
      
      providers:[FormBuilder,HttpClientModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    mockHttpService.post.and.returnValue(of(logcc));
    component.register()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
