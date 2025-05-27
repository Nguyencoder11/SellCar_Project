package com.codefree.SellCar_Spring.services.admin;

import com.codefree.SellCar_Spring.dto.CarDto;

import java.io.IOException;

public interface AdminService {
    boolean postCar(CarDto carDto) throws IOException;
}
