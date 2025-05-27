import { Component } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {StorageService} from '../../services/storage/storage.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, NzSpinComponent, NzRowDirective, NzColDirective, NzFormDirective, NzFormControlComponent, NzInputGroupComponent, NzInputDirective, NzButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private message: NzMessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  login() {
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res)
      if (res.id != null) {
        const user = {
          id: res.userId,
          role: res.userRole
        }
        StorageService.saveUser(user)
        StorageService.saveToken(res.jwt)
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard")
        } else if (StorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl("/customer/dashboard")
        } else {
          this.message.error("Bad credentials", {nzDuration: 50000})
        }
      }
    })
  }
}
