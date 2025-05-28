package com.codefree.SellCar_Spring.services.admin;

import com.codefree.SellCar_Spring.dto.BookACarDto;
import com.codefree.SellCar_Spring.dto.CarDto;
import com.codefree.SellCar_Spring.dto.CarDtoListDto;
import com.codefree.SellCar_Spring.dto.SearchCarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {
    boolean postCar(CarDto carDto) throws IOException;

    List<CarDto> getAllCars();

    void deleteCar(Long id);

    CarDto getCarById(Long id);

    boolean updateCar(Long id, CarDto carDto) throws IOException;

    List<BookACarDto> getBookings();

    boolean changeBookingStatus(Long bookingId, String status);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
