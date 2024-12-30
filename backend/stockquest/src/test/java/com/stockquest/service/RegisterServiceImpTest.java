package com.stockquest.service;

import com.stockquest.entity.Register;
import com.stockquest.repo.RegisterRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RegisterServiceImpTest {

    @InjectMocks
    private RegisterServiceImp registerService;

    @Mock
    private RegisterRepo registerRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLoadUserByUsername_UserExists() {
       
        String email = "test@example.com";
        Register user = new Register();
        user.setEmail(email);
        user.setPassword("password");

        when(registerRepo.findByEmail(email)).thenReturn(user);

        UserDetails userDetails = registerService.loadUserByUsername(email);

        assertNotNull(userDetails);
        assertEquals(email, userDetails.getUsername());
        verify(registerRepo, times(1)).findByEmail(email);
    }

    @Test
    void testLoadUserByUsername_UserDoesNotExist() {
        String email = "test@example.com";
        when(registerRepo.findByEmail(email)).thenReturn(null);

        assertThrows(RuntimeException.class, () -> registerService.loadUserByUsername(email));
        verify(registerRepo, times(1)).findByEmail(email);
    }
}
