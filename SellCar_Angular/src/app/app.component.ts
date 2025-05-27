import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzRowDirective } from 'ng-zorro-antd/grid';
import {StorageService} from './auth/services/storage/storage.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NzLayoutModule, RouterLink, NzButtonComponent, NzRowDirective, RouterLinkActive, NgIf]
})
export class AppComponent {
  title = 'SellCar_Angular';

  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn()
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn()

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn()
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn()
      }
    })
  }

  logout() {
    StorageService.logout()
    this.router.navigateByUrl("/login")
  }
}
