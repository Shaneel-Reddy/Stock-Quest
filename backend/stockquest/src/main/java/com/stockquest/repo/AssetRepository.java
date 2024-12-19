package com.stockquest.repo;

import com.stockquest.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AssetRepository extends JpaRepository<Asset, Long> {
	
    List<Asset> findByUserId(Long userId);

    Asset findByUserIdAndTicker(Long userId, String ticker);

    Optional<Asset> findByIdAndUserId(Long assetId, Long userId);
}
