import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  type:string = "password";
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm!: FormGroup;
  constructor (
    private fb: FormBuilder,
    private auth: AuthService
  ) {}


 
  ngOnInit(): void {
    this.loginForm = this.fb.group({    //grouping the form
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }
  onLogin(){
    if(this.loginForm.valid){

      console.log(this.loginForm.value)
      //send obj to db
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message)
        },
        error: (err)=>{
          alert(err?.error.message)
        }
      })

    }else {

      console.log("Form is not valid");
      //error using toaster
      this.validateAllFormFileds(this.loginForm);
      alert("Your form is invalid")
    }
  }

  private validateAllFormFileds(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control?.markAsDirty({onlySelf:true});
      } else if (control instanceof FormGroup){
        this.validateAllFormFileds(control)
      }
    })
  }
}
