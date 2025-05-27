import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective} from 'ng-zorro-antd/form';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {NzMessageService} from "ng-zorro-antd/message"

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, NzSpinComponent, NzRowDirective, NzColDirective, NzFormDirective, NzFormControlComponent, NzInputDirective, NgIf, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private message: NzMessageService,
              private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name:[null, [Validators.required]],
      email:[null, [Validators.required, Validators.email]],
      password:[null, [Validators.required]],
      checkPassword:[null, [Validators.required, this.confirmationValidate]],
    })
  }

  confirmationValidate = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true }
    }
    return {};
  };

  register() {
    console.log(this.signupForm.value)
    this.authService.register(this.signupForm.value).subscribe((res) => {
      console.log(res)
      if (res.id != null) {
        this.message.success("Signup successful", { nzDuration: 5000 })
        this.router.navigateByUrl("/login")
      } else {
        this.message.error("Something went wrong", { nzDuration: 5000 })
      }
    })
  }

}
