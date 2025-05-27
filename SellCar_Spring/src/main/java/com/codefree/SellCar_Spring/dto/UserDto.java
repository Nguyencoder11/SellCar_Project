package com.codefree.SellCar_Spring.dto;

import com.codefree.SellCar_Spring.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {
    private long id;
    private String name;
    private String email;
    private UserRole userRole;
}
