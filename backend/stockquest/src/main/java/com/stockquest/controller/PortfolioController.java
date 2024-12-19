package com.stockquest.controller;

import com.stockquest.entity.Asset;
import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.service.AssetService;
import com.stockquest.service.PortfolioService;
import com.stockquest.service.RegisterServiceImp;
import com.stockquest.exception.ResourceNotFoundException;
import com.stockquest.exception.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private final AssetService assetService;
    private final PortfolioService portfolioService;
    private final RegisterServiceImp userService;

    public PortfolioController(AssetService assetService, PortfolioService portfolioService, RegisterServiceImp userService) {
        this.assetService = assetService;
        this.portfolioService = portfolioService;
        this.userService = userService;
    }

    @PostMapping("/addAsset")
    public ResponseEntity<Asset> addAssetToPortfolio(@RequestBody Asset asset, @RequestHeader("Authorization") String jwt) {
        try {
            Register user = userService.findUserProfileByJwt(jwt);
            Portfolio portfolio = portfolioService.getPortfolioByUserId(user.getId());
            Asset createdAsset = assetService.createAsset(user, asset, portfolio);

            portfolioService.recalculatePortfolioValue(portfolio);

            return ResponseEntity.ok(createdAsset);
        } catch (Exception e) {
            throw new UnauthorizedException("User not authorized or invalid JWT token.");
        }
    }

    @PutMapping("/updateAsset/{assetId}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long assetId, @RequestBody Asset updatedAsset, @RequestHeader("Authorization") String jwt) {
        try {
            Register user = userService.findUserProfileByJwt(jwt);
            Portfolio portfolio = portfolioService.getPortfolioByUserId(user.getId());
            Asset asset = assetService.updateAsset(assetId, updatedAsset);

            portfolioService.recalculatePortfolioValue(portfolio);

            return ResponseEntity.ok(asset);
        } catch (Exception e) {
            throw new ResourceNotFoundException("Asset not found or invalid asset ID.");
        }
    }

    @DeleteMapping("/deleteAsset/{assetId}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long assetId, @RequestHeader("Authorization") String jwt) throws Exception {
        Register user = userService.findUserProfileByJwt(jwt);
        Portfolio portfolio = portfolioService.getPortfolioByUserId(user.getId());

        Asset asset = assetService.getAssetById(assetId);
        if (asset == null) {
            throw new ResourceNotFoundException("Asset with ID " + assetId + " not found.");
        }

        assetService.deleteAsset(assetId);
        portfolioService.recalculatePortfolioValue(portfolio);

        return ResponseEntity.noContent().build(); 
    }



    @GetMapping("/allAssets")
    public ResponseEntity<List<Asset>> getAssetsForUser(@RequestHeader("Authorization") String jwt) {
        try {
            Register user = userService.findUserProfileByJwt(jwt);
            Portfolio portfolio = portfolioService.getPortfolioByUserId(user.getId());

            return ResponseEntity.ok(portfolio.getAssets());
        } catch (Exception e) {
            throw new UnauthorizedException("User not authorized or invalid JWT token.");
        }
    }

    @GetMapping("/portfolioValue")
    public ResponseEntity<Double> getPortfolioValue(@RequestHeader("Authorization") String jwt) {
        try {
            Register user = userService.findUserProfileByJwt(jwt);
            Portfolio portfolio = portfolioService.getPortfolioByUserId(user.getId());

            return ResponseEntity.ok(portfolio.getTotalValue());
        } catch (Exception e) {
            throw new UnauthorizedException("User not authorized or invalid JWT token.");
        }
    }
}
