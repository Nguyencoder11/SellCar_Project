package com.codefree.SellCar_Spring.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class CarDto {
    private Long id;
    private String brand;
    private String name;
    private String type;
    private String transmission;
    private String color;
    private Date year;
    private Long price;
    private String description;
    private MultipartFile image;
    private byte[] returnedImage;
}
