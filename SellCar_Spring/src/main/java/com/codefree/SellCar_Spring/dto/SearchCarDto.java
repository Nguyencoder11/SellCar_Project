package com.codefree.SellCar_Spring.dto;

import lombok.Data;

@Data
public class SearchCarDto {
    private String brand;
    private String type;
    private String transmission;
    private String color;

}
