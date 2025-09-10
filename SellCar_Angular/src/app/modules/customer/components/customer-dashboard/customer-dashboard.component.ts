import { Component } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {CommonModule, NgForOf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonComponent,
    NzColDirective,
    NzRowDirective,
    RouterLink,
    CommonModule
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {
  cars: any = []

  constructor(private customerService: CustomerService,
              private message: NzMessageService) {
  }

  ngOnInit(){
    this.getAllCars()
  }

  getAllCars() {
    this.customerService.getAllCars().subscribe((res) => {
      console.log(res)
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element)
      })
    })
  }
}
