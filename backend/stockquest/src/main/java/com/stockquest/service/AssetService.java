package com.stockquest.service;

import com.stockquest.entity.Asset;
import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.repo.AssetRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;
@Service
public class AssetService {

    private final AssetRepository assetRepository;
    private final RestTemplate restTemplate;

    @Value("${stock.api.url}")
    private String stockApiUrl;

    @Value("${stock.api.key}")
    private String stockApiKey;

    public AssetService(AssetRepository assetRepository, RestTemplate restTemplate) {
        this.assetRepository = assetRepository;
        this.restTemplate = restTemplate;
    }

    public Asset createAsset(Register user, Asset asset, Portfolio portfolio) {
        asset.setUser(user);
        asset.setPortfolio(portfolio);
        
        Double currentPrice = fetchCurrentPrice(asset.getTicker());
        asset.setCurrentPrice(currentPrice);

        asset.setValue(currentPrice * asset.getQuantity());
        
        asset.setGainPercent(((currentPrice - asset.getBuyPrice()) / asset.getBuyPrice()) * 100);
        

        return assetRepository.save(asset);
    }

    public Asset updateAsset(Long assetId, Asset updatedAsset) throws Exception {
        Asset asset = assetRepository.findById(assetId).orElseThrow(() -> new Exception("Asset not found"));
        asset.setStockName(updatedAsset.getStockName());
        asset.setTicker(updatedAsset.getTicker());
        asset.setQuantity(updatedAsset.getQuantity());
        asset.setBuyPrice(updatedAsset.getBuyPrice());
        
        Double currentPrice = fetchCurrentPrice(updatedAsset.getTicker());
        asset.setCurrentPrice(currentPrice);
        
        asset.setValue(currentPrice * asset.getQuantity());
        asset.setGainPercent(((currentPrice - asset.getBuyPrice()) / asset.getBuyPrice()) * 100);

        return assetRepository.save(asset);
    }

    public void deleteAsset(Long assetId) {
        assetRepository.deleteById(assetId);
    }

    public Asset getAssetById(Long assetId) {
        return assetRepository.findById(assetId)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found"));
    }

    private Double fetchCurrentPrice(String ticker) {
        String url = stockApiUrl + "?symbol=" + ticker + "&interval=1day&outputsize=1&apikey=" + stockApiKey;
        try {
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            List<Map<String, String>> values = (List<Map<String, String>>) response.get("values");
            return Double.parseDouble(values.get(0).get("close"));
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch current price for ticker: " + ticker, e);
        }
    }

}
