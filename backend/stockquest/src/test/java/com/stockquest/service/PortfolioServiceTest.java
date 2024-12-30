package com.stockquest.service;

import com.stockquest.entity.Asset;
import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.repo.PortfolioRepository;
import com.stockquest.repo.RegisterRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PortfolioServiceTest {

    @InjectMocks
    private PortfolioService portfolioService;

    @Mock
    private PortfolioRepository portfolioRepository;

    @Mock
    private RegisterRepo registerRepository;

    private Register user;
    private Portfolio portfolio;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new Register();
        user.setId(1L);
        user.setEmail("test@example.com");

        portfolio = new Portfolio(0.0, user, new ArrayList<>());
        portfolio.setId(1L);
    }

    @Test
    void testGetPortfolioByUserId_UserExists() throws Exception {
        when(portfolioRepository.findByUser_Id(1L)).thenReturn(Optional.of(portfolio));

        Portfolio result = portfolioService.getPortfolioByUserId(1L);

        assertNotNull(result);
        assertEquals(portfolio, result);
        verify(portfolioRepository, times(1)).findByUser_Id(1L);
    }

    @Test
    void testGetPortfolioByUserId_UserDoesNotExist() throws Exception {
        when(portfolioRepository.findByUser_Id(1L)).thenReturn(Optional.empty());
        when(registerRepository.findById(1L)).thenReturn(Optional.of(user));

        Portfolio newPortfolio = new Portfolio(0.0, user, new ArrayList<>());
        when(portfolioRepository.save(any(Portfolio.class))).thenReturn(newPortfolio); 

        Portfolio result = portfolioService.getPortfolioByUserId(1L);

        assertNotNull(result);
        assertEquals(0.0, result.getTotalValue());
        verify(portfolioRepository, times(1)).findByUser_Id(1L);
        verify(portfolioRepository, times(1)).save(any(Portfolio.class));
    }


    @Test
    void testRecalculatePortfolioValue() {
        Asset apple = new Asset("Apple Inc.", "AAPL", 1, 100.0, 120.0, 20.0, user, portfolio);
        Asset amazon = new Asset("Amazon.com Inc.", "AMZN", 1, 200.0, 210.0, 5.0, user, portfolio);
        portfolio.getAssets().add(apple);
        portfolio.getAssets().add(amazon);
        double expectedTotalValue = 0.0;
        for (Asset asset : portfolio.getAssets()) {
            expectedTotalValue += asset.getValue();  
        }

        portfolioService.recalculatePortfolioValue(portfolio);
        
        assertEquals(expectedTotalValue, portfolio.getTotalValue(), 0.01);
        verify(portfolioRepository, times(1)).save(portfolio);
    }


    @Test
    void testCreatePortfolio_UserNotFound() {
        when(registerRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> portfolioService.createPortfolio(1L));
    }
}
