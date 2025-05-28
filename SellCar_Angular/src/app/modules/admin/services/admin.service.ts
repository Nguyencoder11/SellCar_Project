import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from '../../../auth/services/storage/storage.service';

const BASIC_URL = ["http://localhost:8080"]

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCar(carDto: any): Observable<any> {
    return this.http.post(BASIC_URL+"/api/admin/car", carDto, {
      headers: this.createAuthorization()
    })
  }

  getAllCars():Observable<any> {
    return this.http.get(BASIC_URL+"/api/admin/cars", {
      headers: this.createAuthorization()
    })
  }

  getCarBookings():Observable<any> {
    return this.http.get(BASIC_URL+"/api/admin/car/bookings", {
      headers: this.createAuthorization()
    })
  }

  deleteCar(id: number):Observable<any> {
    return this.http.delete(BASIC_URL+"/api/admin/car/" + id, {
      headers: this.createAuthorization()
    })
  }

  getCarById(id: number):Observable<any> {
    return this.http.get(BASIC_URL+"/api/admin/car/"+id, {
      headers: this.createAuthorization()
    })
  }

  updateCar(carId: number, carDto: any):Observable<any> {
    return this.http.put(BASIC_URL+"/api/admin/car/"+carId, carDto,{
      headers: this.createAuthorization()
    })
  }

  changeBookingStatus(bookingId: number, status: string):Observable<any> {
    return this.http.get(BASIC_URL+`/api/admin/car/booking/${bookingId}/${status}`,  {
      headers: this.createAuthorization()
    })
  }

  searchCar(searchCarDto: any):Observable<any> {
    return this.http.post(BASIC_URL+"/api/admin/car/search", searchCarDto, {
      headers: this.createAuthorization()
    })
  }

  createAuthorization(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders()
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    )
  }
}
