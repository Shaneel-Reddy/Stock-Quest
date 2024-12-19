package com.stockquest.service;

import com.stockquest.entity.Asset;
import com.stockquest.entity.Portfolio;
import com.stockquest.entity.Register;
import com.stockquest.repo.AssetRepository;
import org.springframework.stereotype.Service;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Asset createAsset(Register user, Asset asset, Portfolio portfolio) {
        asset.setUser(user);
        asset.setPortfolio(portfolio);
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Long assetId, Asset updatedAsset) throws Exception {
        Asset asset = assetRepository.findById(assetId).orElseThrow(() -> new Exception("Asset not found"));
        asset.setStockName(updatedAsset.getStockName());
        asset.setTicker(updatedAsset.getTicker());
        asset.setQuantity(updatedAsset.getQuantity());
        asset.setBuyPrice(updatedAsset.getBuyPrice());
        asset.setCurrentPrice(updatedAsset.getCurrentPrice());
        asset.setGainPercent(updatedAsset.getGainPercent());
        asset.setValue(updatedAsset.getValue());
        return assetRepository.save(asset);
    }

    public void deleteAsset(Long assetId) {
        assetRepository.deleteById(assetId);
    }

	public Asset getAssetById(Long assetId) {
		return assetRepository.findById(assetId)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found"));
	}
}
