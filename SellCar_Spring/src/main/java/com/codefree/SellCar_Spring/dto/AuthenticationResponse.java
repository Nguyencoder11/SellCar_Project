package com.codefree.SellCar_Spring.dto;

import com.codefree.SellCar_Spring.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String jwt;

    private UserRole userRole;

    private Long userId;
}
