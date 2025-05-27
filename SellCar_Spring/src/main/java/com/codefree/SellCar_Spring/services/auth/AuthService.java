package com.codefree.SellCar_Spring.services.auth;

import com.codefree.SellCar_Spring.dto.SignupRequest;
import com.codefree.SellCar_Spring.dto.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
