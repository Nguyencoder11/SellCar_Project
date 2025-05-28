import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {NgForOf} from '@angular/common';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NgForOf,
    NzRowDirective,
    NzColDirective,
    NzButtonComponent,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = []

  constructor(private adminService: AdminService,
              private message: NzMessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllCars()
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res)
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element)
      })
    })
  }

  deleteCar(id: number) {
    console.log(id)
    this.adminService.deleteCar(id).subscribe((res) => {
      this.getAllCars()
      this.message.success("Car deleted successfully", {nzDuration: 5000})
    })
  }
}
