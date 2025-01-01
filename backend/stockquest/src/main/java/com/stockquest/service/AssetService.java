package com.stockquest.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.stockquest.entity.Asset;
import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.repo.AssetRepository;

@Service
public class AssetService {

	private final AssetRepository assetRepository;
	private final RestTemplate restTemplate;

	@Value("${finnhub.api.url}")
	private String finnhubApiUrl;

	@Value("${finnhub.api.key}")
	private String finnhubApiKey;

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
		double gainPercent = ((currentPrice - asset.getBuyPrice()) / asset.getBuyPrice()) * 100;

		BigDecimal roundedGainPercent = new BigDecimal(gainPercent).setScale(2, RoundingMode.HALF_UP);
		asset.setGainPercent(roundedGainPercent.doubleValue());

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

		double gainPercent = ((currentPrice - asset.getBuyPrice()) / asset.getBuyPrice()) * 100;
		BigDecimal roundedGainPercent = new BigDecimal(gainPercent).setScale(2, RoundingMode.HALF_UP);
		asset.setGainPercent(roundedGainPercent.doubleValue());
		return assetRepository.save(asset);
	}

	public void deleteAsset(Long assetId) {
		assetRepository.deleteById(assetId);
	}

	public Asset getAssetById(Long assetId) {
		return assetRepository.findById(assetId).orElseThrow(() -> new IllegalArgumentException("Asset not found"));
	}

	public Double fetchCurrentPrice(String ticker) {
		String url = finnhubApiUrl + "/quote?symbol=" + ticker.toUpperCase() + "&token=" + finnhubApiKey;
		try {
			Map<String, Object> response = restTemplate.getForObject(url, Map.class);
			System.out.println("API Response for " + ticker + ": " + response);
			if (response != null && response.containsKey("c")) {
				Double price = (Double) response.get("c");
				if (price == null || price == 0.0) {
					throw new RuntimeException("API returned invalid current price for ticker: " + ticker);
				}
				return price;
			} else {
				throw new RuntimeException("Invalid response from API for ticker: " + ticker);
			}
		} catch (Exception e) {
			throw new RuntimeException("Failed to fetch current price for ticker: " + ticker, e);
		}
	}

	@Scheduled(fixedRate = 86400000)
	public void updateStockPrices() {
		List<Asset> assets = assetRepository.findAll();
		for (Asset asset : assets) {
			try {
				Double currentPrice = fetchCurrentPrice(asset.getTicker());
				asset.setCurrentPrice(currentPrice);
				asset.setValue(currentPrice * asset.getQuantity());

				double gainPercent = ((currentPrice - asset.getBuyPrice()) / asset.getBuyPrice()) * 100;
				BigDecimal roundedGainPercent = new BigDecimal(gainPercent).setScale(2, RoundingMode.HALF_UP);
				asset.setGainPercent(roundedGainPercent.doubleValue());

				assetRepository.save(asset);
			} catch (Exception e) {
				System.err.println("Error updating price for " + asset.getTicker() + ": " + e.getMessage());
			}
		}
	}

	public void createDefaultAssetsForUser(Register user, Portfolio portfolio) {
		List<Asset> assets = Arrays.asList(new Asset("Apple Inc.", "AAPL", 1, 200.0, 100.0, 0.0, user, portfolio),
				new Asset("Tesla Inc.", "TSLA", 1, 400.0, 150.0, 0.0, user, portfolio),
				new Asset("Microsoft Corporation", "MSFT", 1, 400.0, 50.0, 0.0, user, portfolio),
				new Asset("Amazon.com Inc.", "AMZN", 1, 200.0, 200.0, 0.0, user, portfolio),
				new Asset("Google", "GOOGL", 1, 150.0, 30.0, 0.0, user, portfolio)

		);

		for (Asset asset : assets) {
			Double currentPrice = fetchCurrentPrice(asset.getTicker());
			asset.setCurrentPrice(currentPrice);
			asset.setValue(currentPrice * asset.getQuantity());

			double gainPercent = ((currentPrice - asset.getBuyPrice()) / asset.getBuyPrice()) * 100;
			BigDecimal roundedGainPercent = new BigDecimal(gainPercent).setScale(2, RoundingMode.HALF_UP);
			asset.setGainPercent(roundedGainPercent.doubleValue());
		}

		assetRepository.saveAll(assets);
	}

}