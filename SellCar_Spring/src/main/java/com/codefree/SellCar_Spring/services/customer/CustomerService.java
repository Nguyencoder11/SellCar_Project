package com.codefree.SellCar_Spring.services.customer;

import com.codefree.SellCar_Spring.dto.BookACarDto;
import com.codefree.SellCar_Spring.dto.CarDto;
import com.codefree.SellCar_Spring.dto.CarDtoListDto;
import com.codefree.SellCar_Spring.dto.SearchCarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars();

    boolean bookACar(Long carId, BookACarDto bookACarDto);

    CarDto getCarById(Long carId);

    List<BookACarDto> getBookingByUserId(Long userId);

    CarDtoListDto searchCar(SearchCarDto searchCarDto);
}
