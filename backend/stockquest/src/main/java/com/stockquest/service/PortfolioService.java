package com.stockquest.service;

import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.repo.PortfolioRepository;
import com.stockquest.repo.RegisterRepo;
import org.springframework.stereotype.Service;
import com.stockquest.entity.Asset;

import java.util.ArrayList;

@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final RegisterRepo registerRepository;

    public PortfolioService(PortfolioRepository portfolioRepository, RegisterRepo registerRepository) {
        this.portfolioRepository = portfolioRepository;
        this.registerRepository = registerRepository;
    }

    public Portfolio getPortfolioByUserId(Long userId) throws Exception {
        return portfolioRepository.findByUser_Id(userId)
                .orElseGet(() -> createPortfolio(userId));
    }

    private Portfolio createPortfolio(Long userId) {
        Register user = registerRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        Portfolio newPortfolio = new Portfolio(0.0, user, new ArrayList<>());
        return portfolioRepository.save(newPortfolio);
    }

    public void recalculatePortfolioValue(Portfolio portfolio) {
        double totalValue = portfolio.getAssets().stream()
                .mapToDouble(Asset::getValue)
                .sum();
        portfolio.setTotalValue(totalValue);
        portfolioRepository.save(portfolio);
    }
}