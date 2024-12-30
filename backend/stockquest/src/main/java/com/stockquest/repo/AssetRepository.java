package com.stockquest.repo;

import com.stockquest.entity.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
	
    List<Asset> findByUserId(Long userId);

    Asset findByUserIdAndTicker(Long userId, String ticker);

    Optional<Asset> findByIdAndUserId(Long assetId, Long userId);
}
