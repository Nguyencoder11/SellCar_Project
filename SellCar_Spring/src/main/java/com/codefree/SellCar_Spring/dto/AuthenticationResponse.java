package com.codefree.SellCar_Spring.dto;

import com.codefree.SellCar_Spring.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String jwt;
    private UserRole userRole;
    private Long userId;
}
